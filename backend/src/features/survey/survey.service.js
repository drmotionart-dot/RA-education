import { SurveyGraph, SurveySession } from './survey.model.js';
import { User } from '../users/users.model.js';
import { Specialty } from '../catalog/catalog.model.js';
import { ApiError } from '../../utils/apiError.js';
import { normalizeScores, computeEuclideanSimilarity, generateWhySummary } from '../../utils/scoring.js';

const MAX_QUESTIONS = 35;

function getOrCreateGraph(type, role) {
  return SurveyGraph.findOne({ type, role }).lean();
}

export async function startSurvey(mobileNumber, { type, role }) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found. Please complete onboarding first.');

  const graph = await getOrCreateGraph(type, role);
  if (!graph) throw new ApiError(404, `No survey found for ${role} ${type}. Has it been seeded?`);

  const rootNode = graph.nodes.find(n => n.node_id === graph.root_node_id);
  if (!rootNode) throw new ApiError(500, 'Survey graph has no root node');

  const existing = await SurveySession.findOne({ user_id: user._id, status: 'in_progress' });
  if (existing) {
    const currentNode = graph.nodes.find(n => n.node_id === existing.current_node_id);
    return formatSurveyQuestion(graph, currentNode, existing);
  }

  const session = await SurveySession.create({
    user_id: user._id,
    graph_id: graph._id,
    current_node_id: graph.root_node_id,
    axis_scores: {},
    answered_node_ids: [],
    response_count: 0,
  });

  return formatSurveyQuestion(graph, rootNode, session);
}

export async function answerQuestion(mobileNumber, sessionId, { node_id, option_index }) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const session = await SurveySession.findById(sessionId);
  if (!session) throw new ApiError(404, 'Survey session not found');
  if (String(session.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This session does not belong to you');
  }
  if (session.status === 'completed') {
    throw new ApiError(400, 'Survey already completed');
  }
  if (session.current_node_id !== node_id) {
    throw new ApiError(400, 'This question is not the current question');
  }

  const graph = await SurveyGraph.findById(session.graph_id).lean();
  if (!graph) throw new ApiError(404, 'Survey graph not found');

  const node = graph.nodes.find(n => n.node_id === node_id);
  if (!node) throw new ApiError(404, 'Question node not found in graph');

  const option = node.options[option_index];
  if (!option) throw new ApiError(400, 'Invalid option index');

  const axisScores = session.axis_scores || {};
  if (option.axis_deltas) {
    for (const [axis, delta] of Object.entries(option.axis_deltas)) {
      const current = axisScores.get(axis) || 0;
      axisScores.set(axis, current + delta);
    }
  }
  session.markModified('axis_scores');
  session.answered_node_ids = [...(session.answered_node_ids || []), node_id];
  session.response_count = (session.response_count || 0) + 1;

  const nextNodeId = option.next_node_id;

  if (!nextNodeId || session.response_count >= MAX_QUESTIONS) {
    session.status = 'completed';
    session.completed_at = new Date();
    session.current_node_id = null;
    session.results = computeResults(session.axis_scores, graph);
    await session.save();
    return await formatSurveyResults(session, graph);
  }

  const nextNode = graph.nodes.find(n => n.node_id === nextNodeId);
  if (!nextNode) {
    session.status = 'completed';
    session.completed_at = new Date();
    session.current_node_id = null;
    session.results = computeResults(session.axis_scores, graph);
    await session.save();
    return await formatSurveyResults(session, graph);
  }

  session.current_node_id = nextNodeId;
  await session.save();

  return formatSurveyQuestion(graph, nextNode, session);
}

export async function getSessionState(mobileNumber, sessionId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const session = await SurveySession.findById(sessionId);
  if (!session) throw new ApiError(404, 'Survey session not found');
  if (String(session.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This session does not belong to you');
  }

  if (session.status === 'completed') {
    const graph = await SurveyGraph.findById(session.graph_id).lean();
    return await formatSurveyResults(session, graph);
  }

  const graph = await SurveyGraph.findById(session.graph_id).lean();
  const currentNode = graph.nodes.find(n => n.node_id === session.current_node_id);
  return formatSurveyQuestion(graph, currentNode, session);
}

export async function completeSurvey(mobileNumber, sessionId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const session = await SurveySession.findById(sessionId);
  if (!session) throw new ApiError(404, 'Survey session not found');
  if (String(session.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This session does not belong to you');
  }
  if (session.status === 'completed') {
    throw new ApiError(400, 'Survey already completed');
  }

  const graph = await SurveyGraph.findById(session.graph_id).lean();

  session.status = 'completed';
  session.completed_at = new Date();
  session.current_node_id = null;
  session.results = computeResults(session.axis_scores, graph);
  await session.save();

  return await formatSurveyResults(session, graph);
}

function computeResults(axisScores, graph) {
  const boundsMap = {};
  for (const b of (graph.axis_bounds || [])) {
    boundsMap[b.axis_name] = { min: b.min, max: b.max };
  }

  const plainScores = axisScores && typeof axisScores.entries === 'function' ? Object.fromEntries(axisScores) : (axisScores || {});
  const normalized = normalizeScores(plainScores, boundsMap, graph.axes);

  const matches = (graph.target_vectors || []).map(tv => {
    const target = {};
    for (const axis of (graph.axes || [])) {
      target[axis] = tv.axes?.[axis] ?? 0.5;
    }
    const similarity = computeEuclideanSimilarity(normalized, target, graph.axes);
    const contributing = generateWhySummary(normalized, target, graph.axes);
    return { specialty_name: tv.specialty_name, similarity, axes_contributing: contributing };
  });

  matches.sort((a, b) => b.similarity - a.similarity);

  const top5 = matches.slice(0, 5);
  const topMatch = top5[0];

  return {
    matches: top5,
    top_match: topMatch?.specialty_name || null,
    confidence: topMatch ? Math.round(topMatch.similarity * 100) : 0,
  };
}

function formatSurveyQuestion(graph, node, session) {
  return {
    session_id: session._id,
    status: 'in_progress',
    question: {
      node_id: node.node_id,
      question_text: node.question_text,
      is_universal: node.is_universal,
      options: node.options.map((o, i) => ({
        index: i,
        option_text: o.option_text,
      })),
    },
    progress: {
      answered: session.response_count,
      total: MAX_QUESTIONS,
    },
  };
}

async function formatSurveyResults(session, graph) {
  const matches = (session.results?.matches || []).map(m => ({ ...m }));
  const names = matches.map(m => m.specialty_name).filter(Boolean);
  if (names.length > 0) {
    const specs = await Specialty.find({ name: { $in: names } }, { name: 1 }).lean();
    const specMap = {};
    for (const s of specs) specMap[s.name] = s._id;
    for (const m of matches) m.specialty_id = specMap[m.specialty_name] || null;
  }
  return {
    session_id: session._id,
    status: 'completed',
    results: { ...session.results, matches },
  };
}

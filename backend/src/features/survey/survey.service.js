import { SurveyGraph, SurveySession } from './survey.model.js';
import { User } from '../users/users.model.js';
import { Specialty, Path } from '../catalog/catalog.model.js';
import { ApiError } from '../../utils/apiError.js';
import { normalizeScores, computeEuclideanSimilarity, computeAxisWeights, generateAxisBreakdown } from '../../utils/scoring.js';
import { QuickPickSelection } from '../quickpick/quickpick.model.js';
import { StudyPlan } from '../studyplan/studyplan.model.js';
import { generatePlan } from '../studyplan/studyplan.service.js';

const DEFAULT_MAX_QUESTIONS = 35;

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

  const existing = await SurveySession.findOne({ user_id: user._id, graph_id: graph._id, status: 'in_progress' });
  if (existing) {
    const currentNode = graph.nodes.find(n => n.node_id === existing.current_node_id);
    if (!currentNode) {
      existing.status = 'completed';
      existing.completed_at = new Date();
      await existing.save();
    } else {
      return formatSurveyQuestion(graph, currentNode, existing, graph.max_questions);
    }
  }

  const session = await SurveySession.create({
    user_id: user._id,
    graph_id: graph._id,
    current_node_id: graph.root_node_id,
    axis_scores: {},
    answered_node_ids: [],
    response_count: 0,
  });

  return formatSurveyQuestion(graph, rootNode, session, graph.max_questions);
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
  if ((session.answered_node_ids || []).includes(node_id)) {
    throw new ApiError(400, 'This question has already been answered');
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

  if (!nextNodeId || session.response_count >= (graph.max_questions || DEFAULT_MAX_QUESTIONS)) {
    session.status = 'completed';
    session.completed_at = new Date();
    session.current_node_id = null;
    try {
      session.results = computeResults(session.axis_scores, graph);
    } catch (err) {
      console.error('computeResults failed (terminal node), returning empty matches:', err);
      session.results = { matches: [], top_match: null, confidence: 0 };
    }
    await session.save();
    return await formatSurveyResults(session, graph);
  }

  const nextNode = graph.nodes.find(n => n.node_id === nextNodeId);
  if (!nextNode) {
    session.status = 'completed';
    session.completed_at = new Date();
    session.current_node_id = null;
    try {
      session.results = computeResults(session.axis_scores, graph);
    } catch (err) {
      console.error('computeResults failed (nextNode missing), returning empty matches:', err);
      session.results = { matches: [], top_match: null, confidence: 0 };
    }
    await session.save();
    return await formatSurveyResults(session, graph);
  }

  session.current_node_id = nextNodeId;
  await session.save();

  return formatSurveyQuestion(graph, nextNode, session, graph.max_questions);
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
    if (!graph) throw new ApiError(500, 'Survey graph not found');
    return await formatSurveyResults(session, graph);
  }

  const graph = await SurveyGraph.findById(session.graph_id).lean();
  if (!graph?.nodes?.length) throw new ApiError(500, 'Survey graph has no nodes');
  const currentNode = graph.nodes.find(n => n.node_id === session.current_node_id);
  if (!currentNode) throw new ApiError(500, 'Current node not found in graph');
  return formatSurveyQuestion(graph, currentNode, session, graph.max_questions);
}

export async function abandonSurvey(mobileNumber, sessionId) {
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

  session.status = 'completed';
  session.completed_at = new Date();
  session.current_node_id = null;
  session.results = { matches: [], top_match: null, confidence: 0 };
  await session.save();

  return { session_id: session._id, status: 'abandoned' };
}

export async function getSurveyStatus(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const completedSessions = await SurveySession.find({ user_id: user._id, status: 'completed' })
    .select('graph_id')
    .lean();

  const graphIds = [...new Set(completedSessions.map(s => s.graph_id).filter(Boolean))];
  const graphs = await SurveyGraph.find({ _id: { $in: graphIds } }).select('type role').lean();

  const completion = { doctor_specialty: false, nurse_specialty: false, doctor_path: false, nurse_path: false };
  for (const g of graphs) {
    const key = `${g.role}_${g.type}`;
    if (completion.hasOwnProperty(key)) completion[key] = true;
  }

  const planFromSurvey = await StudyPlan.findOne({ user_id: user._id, source: 'survey_result', status: 'active' }).lean();

  return {
    ...completion,
    hasCompletedSurvey: completedSessions.length > 0,
    hasPlanFromSurvey: !!planFromSurvey,
  };
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
  if (!graph) throw new ApiError(500, 'Survey graph not found');

  session.status = 'completed';
  session.completed_at = new Date();
  session.current_node_id = null;
  try {
    session.results = computeResults(session.axis_scores, graph);
  } catch (err) {
    console.error('computeResults failed (completeSurvey), returning empty matches:', err);
    session.results = { matches: [], top_match: null, confidence: 0 };
  }
  await session.save();

  return await formatSurveyResults(session, graph);
}

export async function createPlanFromSurvey(mobileNumber, sessionId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const session = await SurveySession.findById(sessionId);
  if (!session) throw new ApiError(404, 'Survey session not found');
  if (String(session.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This session does not belong to you');
  }
  if (session.status !== 'completed' || !session.results?.top_match) {
    throw new ApiError(400, 'Survey must be completed with a top match to create a plan');
  }

  const topMatchName = session.results.top_match;
  const graph = await SurveyGraph.findById(session.graph_id).lean();
  if (!graph) throw new ApiError(500, 'Survey graph not found');
  const Model = graph.type === 'path' ? Path : Specialty;
  const doc = await Model.findOne({ name: topMatchName });
  if (!doc) throw new ApiError(404, `No ${graph.type} found with name "${topMatchName}"`);

  if (graph.type === 'path') {
    const paths = await Path.find({ name: topMatchName });
    if (paths.length === 0) throw new ApiError(404, 'No path found for the top match');
    const specialty = await Specialty.findOne({ category: paths[0].category });
    if (!specialty) throw new ApiError(404, 'No specialty found for the matched path');

    const selection = await QuickPickSelection.create({
      user_id: user._id,
      specialty_id: specialty._id,
      path_id: paths[0]._id,
      preset_duration_months: 12,
    });
    const plan = await generatePlan(mobileNumber, selection._id);
    return { plan, source: 'survey_result' };
  }

  const paths = await Path.find({ category: doc.category });
  if (paths.length === 0) throw new ApiError(404, 'No paths found for the matched specialty');

  const selection = await QuickPickSelection.create({
    user_id: user._id,
    specialty_id: doc._id,
    path_id: paths[0]._id,
    preset_duration_months: 12,
  });
  const plan = await generatePlan(mobileNumber, selection._id);
  return { plan, source: 'survey_result' };
}

function computeResults(axisScores, graph) {
  const boundsMap = {};
  for (const b of (graph.axis_bounds || [])) {
    boundsMap[b.axis_name] = { min: b.min, max: b.max };
  }

  const plainScores = axisScores && typeof axisScores.entries === 'function' ? Object.fromEntries(axisScores) : (axisScores || {});
  const normalized = normalizeScores(plainScores, boundsMap, graph.axes);

  const weights = computeAxisWeights(graph.target_vectors || [], graph.axes);

  // Detect axes that were never hit by the user's answers
  const hitAxes = new Set(Object.keys(plainScores));
  const totalAxes = graph.axes || [];
  const unhitAxes = totalAxes.filter(axis => !hitAxes.has(axis));
  const unhitWarning = unhitAxes.length > 0 && (unhitAxes.length / totalAxes.length) > 0.3
    ? `${Math.round((unhitAxes.length / totalAxes.length) * 100)}% of preference axes were never addressed in your answers (${unhitAxes.join(', ')}). Results may be less precise.`
    : null;

  const matches = (graph.target_vectors || []).map(tv => {
    const target = {};
    for (const axis of (graph.axes || [])) {
      target[axis] = tv.axes?.[axis] ?? 0.5;
    }
    const similarity = computeEuclideanSimilarity(normalized, target, graph.axes, weights);
    const { strongest, distinguishing } = generateAxisBreakdown(normalized, target, graph.axes);
    return { specialty_name: tv.specialty_name, similarity, strongest_axes: strongest, distinguishing_axes: distinguishing };
  });

  matches.sort((a, b) => b.similarity - a.similarity || a.specialty_name.localeCompare(b.specialty_name));

  if (process.env.DEBUG_SURVEY) {
    console.log(`[DEBUG_SURVEY] graph=${graph.type}/${graph.role} matches=${matches.length}`);
    for (const m of matches.slice(0, 3)) {
      console.log(`  #${(m.similarity * 100).toFixed(2)}% ${m.specialty_name}`);
    }
  }

  const top5 = matches.slice(0, 5);
  const topMatch = top5[0];

  return {
    type: graph.type,
    matches: top5,
    top_match: topMatch?.specialty_name || null,
    confidence: topMatch ? Math.round(topMatch.similarity * 100) : 0,
    unhit_axes_warning: unhitWarning,
  };
}

function formatSurveyQuestion(graph, node, session, maxQuestions) {
  if (!node) throw new ApiError(500, 'Survey question node is missing');
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
      total: maxQuestions || DEFAULT_MAX_QUESTIONS,
    },
  };
}

async function formatSurveyResults(session, graph) {
  const matches = (session.results?.matches || []).map(m => (m.toObject ? m.toObject() : { ...m }));
  const names = matches.map(m => m.specialty_name).filter(Boolean);
  if (names.length > 0) {
    const Model = graph.type === 'path' ? Path : Specialty;
    const docs = await Model.find({ name: { $in: names } }, { name: 1 }).lean();
    const docMap = {};
    for (const d of docs) docMap[d.name] = d._id;
    for (const m of matches) m.specialty_id = docMap[m.specialty_name] || null;
  }
  return {
    type: graph.type,
    session_id: session._id,
    status: 'completed',
    results: { ...session.results, matches },
  };
}

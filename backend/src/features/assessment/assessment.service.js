import { Question, Assessment, AssessmentResponse } from './assessment.model.js';
import { Specialty } from '../catalog/catalog.model.js';
import { StudyPlan, PlanLesson } from '../studyplan/studyplan.model.js';
import { Lesson } from '../lessons/lessons.model.js';
import { User } from '../users/users.model.js';
import { ApiError } from '../../utils/apiError.js';
import { distributeByLargestRemainder } from '../../utils/allocator.js';

/*
  REALLOCATION_FACTOR: controls how aggressively weak branch scores
  increase study-time weight. The formula is:
    adjustedWeight = originalWeight × (1 + (1 - scorePct) × REALLOCATION_FACTOR)
  Bounds: 1.0× at scorePct=1.0 (perfect → no change) to 2.0× at scorePct=0.0
  (zero score → double weight). Factor=1.0 gives a clean, self-limiting range.
  Change this constant if real usage data suggests a different aggression level.
*/
const REALLOCATION_FACTOR = 1.0;

const DAYS_PER_MONTH = 30;

export async function startAssessment(mobileNumber, specialtyId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found. Please complete onboarding first.');

  const specialty = await Specialty.findById(specialtyId);
  if (!specialty) throw new ApiError(404, 'Specialty not found');

  const questionCount = await Question.countDocuments({ specialty_id: specialtyId });
  if (questionCount === 0) {
    throw new ApiError(400, 'No questions available for this specialty yet');
  }

  const assessment = await Assessment.create({
    user_id: user._id,
    specialty_id: specialtyId,
    question_count: questionCount,
  });

  return {
    assessment_id: assessment._id,
    specialty_name: specialty.name,
    question_count: questionCount,
    status: assessment.status,
  };
}

export async function getNextQuestion(mobileNumber, assessmentId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new ApiError(404, 'Assessment not found');
  if (String(assessment.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This assessment does not belong to you');
  }
  if (assessment.status === 'completed') {
    throw new ApiError(400, 'Assessment already completed');
  }

  const answeredIds = await AssessmentResponse
    .find({ assessment_id: assessmentId })
    .distinct('question_id');

  let questionFilter;
  if (assessment.plan_lesson_id) {
    const planLesson = await PlanLesson.findById(assessment.plan_lesson_id);
    if (planLesson) {
      questionFilter = { branch_id: planLesson.branch_id, _id: { $nin: answeredIds } };
    } else {
      questionFilter = { specialty_id: assessment.specialty_id, _id: { $nin: answeredIds } };
    }
  } else {
    questionFilter = { specialty_id: assessment.specialty_id, _id: { $nin: answeredIds } };
  }

  const nextQuestion = await Question.findOne(questionFilter).sort({ difficulty: 1, _id: 1 });

  if (!nextQuestion) {
    await autoCompleteAssessment(assessment);
    return { status: 'completed' };
  }

  return {
    status: 'in_progress',
    question: {
      _id: nextQuestion._id,
      question_text: nextQuestion.question_text,
      question_type: nextQuestion.question_type,
      options: nextQuestion.options.map(o => ({
        _id: o._id,
        option_text: o.option_text,
        order: o.order,
      })),
      difficulty: nextQuestion.difficulty,
    },
    progress: {
      answered: assessment.answered_count,
      total: assessment.question_count,
    },
  };
}

export async function submitAnswer(mobileNumber, assessmentId, questionId, selectedOptionIds) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new ApiError(404, 'Assessment not found');
  if (String(assessment.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This assessment does not belong to you');
  }
  if (assessment.status === 'completed') {
    throw new ApiError(400, 'Assessment already completed');
  }

  const existing = await AssessmentResponse.findOne({
    assessment_id: assessmentId,
    question_id: questionId,
  });
  if (existing) {
    throw new ApiError(400, 'Question already answered');
  }

  const question = await Question.findById(questionId);
  if (!question) throw new ApiError(404, 'Question not found');

  const correctOptionIds = question.options
    .filter(o => o.is_correct)
    .map(o => String(o._id));

  const selectedStr = (selectedOptionIds || []).map(id => String(id));
  const isCorrect =
    selectedStr.length === correctOptionIds.length &&
    selectedStr.every(id => correctOptionIds.includes(id));

  await AssessmentResponse.create({
    assessment_id: assessmentId,
    question_id: questionId,
    selected_option_ids: selectedOptionIds || [],
    is_correct: isCorrect,
    response_order: assessment.answered_count + 1,
  });

  assessment.answered_count += 1;

  if (assessment.answered_count >= assessment.question_count) {
    await autoCompleteAssessment(assessment);
    return { status: 'completed' };
  }

  await assessment.save();
  return { status: 'in_progress', is_correct: isCorrect };
}

export async function getResults(mobileNumber, assessmentId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new ApiError(404, 'Assessment not found');
  if (String(assessment.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This assessment does not belong to you');
  }

  return formatAssessmentResult(assessment);
}

export async function reallocatePlan(mobileNumber, assessmentId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new ApiError(404, 'Assessment not found');
  if (String(assessment.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This assessment does not belong to you');
  }
  if (assessment.status !== 'completed') {
    throw new ApiError(400, 'Assessment must be completed before reallocating');
  }

  const plan = await StudyPlan.findOne({ user_id: user._id, status: 'active' });
  if (!plan) throw new ApiError(404, 'No active study plan to reallocate');

  const specialty = await Specialty.findById(assessment.specialty_id);
  if (!specialty) throw new ApiError(404, 'Specialty not found');

  const scoreMap = {};
  for (const s of assessment.scoring) {
    scoreMap[String(s.branch_id)] = s.score_pct;
  }

  const adjustedBranches = specialty.branches.map(b => {
    const scorePct = scoreMap[String(b._id)];
    if (scorePct === undefined) {
      return { _id: b._id, weight: b.weight, order: b.order };
    }
    const adjustedWeight = b.weight * (1 + (1 - scorePct) * REALLOCATION_FACTOR);
    return { _id: b._id, weight: adjustedWeight, order: b.order };
  });

  const totalDays = plan.total_duration_months * DAYS_PER_MONTH;

  const branchAllocMap = distributeByLargestRemainder(adjustedBranches, totalDays, {
    idKey: '_id',
    weightKey: 'weight',
    orderKey: 'order',
    resultMap: true,
  });

  const newWeighting = adjustedBranches.map((b) => ({
    branch_id: b._id,
    weight: b.weight,
    allocated_days: branchAllocMap.get(b._id),
    lesson_count: 0,
  }));

  plan.branch_weighting = newWeighting;
  plan.source = 'assessment_adjusted';
  await plan.save();

  await PlanLesson.deleteMany({ study_plan_id: plan._id });

  let sequenceOrder = 0;
  const planLessons = [];

  for (const bw of newWeighting) {
    const lessons = await Lesson.find({ branch_id: bw.branch_id })
      .sort({ order: 1 })
      .lean();

    if (lessons.length === 0) continue;

    const lessonAllocMap = distributeByLargestRemainder(lessons, bw.allocated_days, {
      idKey: '_id',
      weightKey: 'weight',
      orderKey: 'order',
      resultMap: true,
    });
    bw.lesson_count = lessons.length;

    for (const lesson of lessons) {
      planLessons.push({
        study_plan_id: plan._id,
        lesson_id: lesson._id,
        branch_id: bw.branch_id,
        sequence_order: ++sequenceOrder,
        allocated_days: lessonAllocMap.get(lesson._id),
        status: sequenceOrder === 1 ? 'in_progress' : 'locked',
      });
    }
  }

  if (planLessons.length > 0) {
    await PlanLesson.insertMany(planLessons);
  }

  await StudyPlan.updateOne(
    { _id: plan._id },
    { $set: { branch_weighting: newWeighting } },
  );

  const lessons = await PlanLesson.find({ study_plan_id: plan._id })
    .sort({ sequence_order: 1 })
    .lean();

  return {
    ...plan.toObject(),
    lessons,
  };
}

async function autoCompleteAssessment(assessment) {
  assessment.status = 'completed';
  assessment.completed_at = new Date();

  const responses = await AssessmentResponse
    .find({ assessment_id: assessment._id })
    .populate('question_id', 'branch_id');

  const branchStats = {};
  for (const r of responses) {
    const q = r.question_id;
    if (!q) continue;
    const bid = String(q.branch_id);
    if (!branchStats[bid]) {
      branchStats[bid] = { branch_id: q.branch_id, correct: 0, total: 0 };
    }
    branchStats[bid].total += 1;
    if (r.is_correct) branchStats[bid].correct += 1;
  }

  const specialty = await Specialty.findById(assessment.specialty_id);
  const branchNameMap = {};
  if (specialty) {
    for (const b of specialty.branches) {
      branchNameMap[String(b._id)] = b.name;
    }
  }

  assessment.scoring = Object.values(branchStats).map(s => ({
    branch_id: s.branch_id,
    branch_name: branchNameMap[String(s.branch_id)] || 'Unknown',
    correct: s.correct,
    total: s.total,
    score_pct: s.total > 0 ? Math.round((s.correct / s.total) * 100) / 100 : 0,
  }));

  await assessment.save();
}

async function formatAssessmentResult(assessment) {
  const doc = assessment.toObject ? assessment.toObject() : assessment;

  let nextAction = null;
  if (doc.status === 'completed') {
    const plan = await StudyPlan.findOne({
      user_id: doc.user_id,
      status: 'active',
    });
    if (plan) {
      nextAction = { can_reallocate: true, plan_id: plan._id };
    }
  }

  return {
    assessment_id: doc._id,
    specialty_id: doc.specialty_id,
    status: doc.status,
    question_count: doc.question_count,
    answered_count: doc.answered_count,
    scoring: doc.scoring,
    started_at: doc.started_at,
    completed_at: doc.completed_at,
    next_action: nextAction,
  };
}

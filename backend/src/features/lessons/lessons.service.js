import { Lesson } from './lessons.model.js';
import { PlanLesson, StudyPlan } from '../studyplan/studyplan.model.js';
import { Assessment, Question } from '../assessment/assessment.model.js';
import { User } from '../users/users.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function getLesson(lessonId) {
  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  return {
    id: lesson._id,
    title: lesson.title,
    description: lesson.description,
    duration_minutes: lesson.duration_minutes,
    branch_id: lesson.branch_id,
    tags: lesson.tags,
    min_pass_score: lesson.min_pass_score,
    resources: (lesson.resources || []).sort((a, b) => a.priority_order - b.priority_order),
  };
}

export async function getLessonResources(lessonId) {
  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  return {
    id: lesson._id,
    title: lesson.title,
    description: lesson.description,
    duration_minutes: lesson.duration_minutes,
    branch_id: lesson.branch_id,
    tags: lesson.tags,
    resources: (lesson.resources || []).sort((a, b) => a.priority_order - b.priority_order),
  };
}

export async function startLessonExam(mobileNumber, planLessonId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const planLesson = await PlanLesson.findById(planLessonId);
  if (!planLesson) throw new ApiError(404, 'Plan lesson not found');

  const plan = await StudyPlan.findById(planLesson.study_plan_id);
  if (!plan || String(plan.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This lesson does not belong to you');
  }

  const lesson = await Lesson.findById(planLesson.lesson_id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const questionCount = await Question.countDocuments({ branch_id: lesson.branch_id });
  if (questionCount === 0) {
    throw new ApiError(400, 'No exam questions available for this lesson yet');
  }

  const assessment = await Assessment.create({
    user_id: user._id,
    specialty_id: plan.specialty_id,
    plan_lesson_id: planLessonId,
    question_count: questionCount,
  });

  return {
    assessment_id: assessment._id,
    lesson_id: lesson._id,
    lesson_title: lesson.title,
    question_count: questionCount,
    status: assessment.status,
  };
}

export async function completeLesson(mobileNumber, planLessonId, assessmentId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const planLesson = await PlanLesson.findById(planLessonId);
  if (!planLesson) throw new ApiError(404, 'Plan lesson not found');
  if (planLesson.status !== 'in_progress' && planLesson.status !== 'failed_needs_retry') {
    throw new ApiError(400, 'Lesson is not in progress');
  }

  const plan = await StudyPlan.findById(planLesson.study_plan_id);
  if (!plan || String(plan.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This lesson does not belong to you');
  }

  const lesson = await Lesson.findById(planLesson.lesson_id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  if (assessmentId) {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) throw new ApiError(404, 'Assessment not found');
    if (String(assessment.plan_lesson_id) !== String(planLessonId)) {
      throw new ApiError(400, 'Assessment does not match this lesson');
    }
    if (assessment.status !== 'completed') {
      throw new ApiError(400, 'Lesson exam must be completed before marking lesson done');
    }

    const overallScore = assessment.scoring.length > 0
      ? assessment.scoring.reduce((sum, s) => sum + s.score_pct, 0) / assessment.scoring.length
      : 0;

    const passScore = (overallScore * 100);
    const minPass = lesson.min_pass_score || 60;

    planLesson.exam_score = passScore;

    if (passScore < minPass) {
      planLesson.status = 'failed_needs_retry';
      planLesson.exam_status = 'failed';
      await planLesson.save();

      const suggestions = await Lesson.find({
        branch_id: lesson.branch_id,
        _id: { $ne: lesson._id },
      }).sort({ order: 1 }).limit(3).lean();

      return {
        passed: false,
        score: passScore,
        min_pass_score: minPass,
        suggestions: suggestions.map(s => ({
          id: s._id,
          title: s.title,
          description: s.description,
          duration_minutes: s.duration_minutes,
        })),
      };
    }

    planLesson.exam_status = 'passed';
  }

  planLesson.status = 'completed';
  planLesson.completed_at = new Date();
  await planLesson.save();

  const nextLesson = await PlanLesson.findOne({
    study_plan_id: planLesson.study_plan_id,
    sequence_order: planLesson.sequence_order + 1,
    status: 'locked',
  });

  if (nextLesson) {
    nextLesson.status = 'in_progress';
    await nextLesson.save();
  }

  const nextLessonId = nextLesson ? nextLesson._id : null;

  return {
    passed: true,
    next_lesson_id: nextLessonId,
    completed_lesson_id: planLesson._id,
  };
}

export async function getSuggestedLessons(mobileNumber, planLessonId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const planLesson = await PlanLesson.findById(planLessonId);
  if (!planLesson) throw new ApiError(404, 'Plan lesson not found');

  const plan = await StudyPlan.findById(planLesson.study_plan_id);
  if (!plan || String(plan.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This lesson does not belong to you');
  }

  const lesson = await Lesson.findById(planLesson.lesson_id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const suggestions = await Lesson.find({
    branch_id: lesson.branch_id,
    _id: { $ne: lesson._id },
  }).sort({ order: 1 }).limit(5).lean();

  return suggestions.map(s => ({
    id: s._id,
    title: s.title,
    description: s.description,
    duration_minutes: s.duration_minutes,
  }));
}

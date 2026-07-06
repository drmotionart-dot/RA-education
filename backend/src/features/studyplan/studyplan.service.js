import { StudyPlan, PlanLesson } from './studyplan.model.js';
import { QuickPickSelection } from '../quickpick/quickpick.model.js';
import { Specialty } from '../catalog/catalog.model.js';
import { Lesson } from '../lessons/lessons.model.js';
import { User } from '../users/users.model.js';
import { ApiError } from '../../utils/apiError.js';
import { distributeByLargestRemainder } from '../../utils/allocator.js';

const DAYS_PER_MONTH = 30;

export async function generatePlan(mobileNumber, quickpickId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found. Please complete onboarding first.');

  const selection = await QuickPickSelection.findById(quickpickId);
  if (!selection) throw new ApiError(404, 'Quick-pick selection not found');
  if (String(selection.user_id) !== String(user._id)) {
    throw new ApiError(403, 'This quick-pick selection does not belong to you');
  }

  const specialty = await Specialty.findById(selection.specialty_id);
  if (!specialty) throw new ApiError(404, 'Specialty not found');
  if (!specialty.branches || specialty.branches.length === 0) {
    throw new ApiError(400, 'Specialty has no branches configured');
  }

  const totalDays = selection.preset_duration_months * DAYS_PER_MONTH;

  const branchAllocMap = distributeByLargestRemainder(specialty.branches, totalDays, {
    idKey: '_id',
    weightKey: 'weight',
    orderKey: 'order',
    resultMap: true,
  });

  const branchWeighting = specialty.branches.map((b) => ({
    branch_id: b._id,
    weight: b.weight,
    allocated_days: branchAllocMap.get(b._id),
    lesson_count: 0,
  }));

  // Archive existing active plan (one-active-plan rule, app-enforced)
  await StudyPlan.updateMany(
    { user_id: user._id, status: 'active' },
    { $set: { status: 'abandoned', updated_at: new Date() } },
  );

  const plan = await StudyPlan.create({
    user_id: user._id,
    specialty_id: selection.specialty_id,
    path_id: selection.path_id,
    source: 'quick_pick',
    total_duration_months: selection.preset_duration_months,
    status: 'active',
    branch_weighting: branchWeighting,
  });

  let sequenceOrder = 0;
  const planLessons = [];

  for (const bw of branchWeighting) {
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
    { $set: { 'branch_weighting': branchWeighting } },
  );

  user.current_plan_id = plan._id;
  await user.save();

  return getPlanById(plan._id);
}

export async function getCurrentPlan(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const plan = await StudyPlan.findOne({ user_id: user._id, status: 'active' }).lean();
  if (!plan) throw new ApiError(404, 'No active study plan found');

  return getPlanById(plan._id);
}

export async function restartPlan(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const oldPlan = await StudyPlan.findOne({ user_id: user._id, status: 'active' });
  if (!oldPlan) throw new ApiError(404, 'No active study plan to restart');

  const quickpick = await QuickPickSelection.findOne({ user_id: user._id })
    .sort({ created_at: -1 });
  if (!quickpick) throw new ApiError(400, 'No quick-pick history found to base restart on');

  oldPlan.status = 'abandoned';
  await oldPlan.save();

  const newPlan = await StudyPlan.create({
    user_id: user._id,
    specialty_id: oldPlan.specialty_id,
    path_id: oldPlan.path_id,
    source: 'quick_pick',
    total_duration_months: quickpick.preset_duration_months,
    status: 'active',
    restarted_from_plan_id: oldPlan._id,
    branch_weighting: oldPlan.branch_weighting,
  });

  const oldLessons = await PlanLesson.find({ study_plan_id: oldPlan._id })
    .sort({ sequence_order: 1 })
    .lean();

  if (oldLessons.length > 0) {
    const newLessons = oldLessons.map((ol, i) => ({
      study_plan_id: newPlan._id,
      lesson_id: ol.lesson_id,
      branch_id: ol.branch_id,
      sequence_order: i + 1,
      allocated_days: ol.allocated_days,
      status: i === 0 ? 'in_progress' : 'locked',
    }));
    await PlanLesson.insertMany(newLessons);
  }

  user.current_plan_id = newPlan._id;
  await user.save();

  return getPlanById(newPlan._id);
}

export async function getPlanHistory(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const plans = await StudyPlan.find({ user_id: user._id })
    .sort({ created_at: -1 })
    .lean();

  if (plans.length === 0) return [];

  const planIds = plans.map(p => p._id);
  const allLessons = await PlanLesson.find({ study_plan_id: { $in: planIds } })
    .sort({ sequence_order: 1 })
    .lean();

  const lessonsByPlan = {};
  for (const l of allLessons) {
    const pid = String(l.study_plan_id);
    if (!lessonsByPlan[pid]) lessonsByPlan[pid] = [];
    lessonsByPlan[pid].push(l);
  }

  return plans.map(plan => {
    const lessons = lessonsByPlan[String(plan._id)] || [];
    const total = lessons.length;
    const completed = lessons.filter(l => l.status === 'completed').length;
    return {
      ...plan,
      lessons: undefined,
      lesson_count: total,
      completed_count: completed,
    };
  });
}

async function getPlanById(planId) {
  const plan = await StudyPlan.findById(planId).lean();
  if (!plan) throw new ApiError(404, 'Plan not found');

  const lessons = await PlanLesson.find({ study_plan_id: planId })
    .sort({ sequence_order: 1 })
    .lean();

  return { ...plan, lessons };
}

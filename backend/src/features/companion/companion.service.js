import { User } from '../users/users.model.js';
import { StudyPlan, PlanLesson } from '../studyplan/studyplan.model.js';
import { CompanionRequest } from './companion.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function findMatches(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const activePlan = await StudyPlan.findOne({ user_id: user._id, status: 'active' }).lean();
  if (!activePlan) throw new ApiError(400, 'You need an active study plan to find companions');

  const sameSpecialtyPlans = await StudyPlan.find({
    _id: { $ne: activePlan._id },
    specialty_id: activePlan.specialty_id,
    status: 'active',
  }).lean();

  if (sameSpecialtyPlans.length === 0) return [];

  const candidateUserIds = sameSpecialtyPlans.map(p => p.user_id);

  const existingRequests = await CompanionRequest.find({
    $or: [
      { from_user_id: user._id, to_user_id: { $in: candidateUserIds } },
      { to_user_id: user._id, from_user_id: { $in: candidateUserIds } },
    ],
    status: { $in: ['pending', 'accepted'] },
  }).lean();

  const pairedIds = new Set();
  for (const r of existingRequests) {
    const otherId = String(r.from_user_id) === String(user._id) ? r.to_user_id : r.from_user_id;
    pairedIds.add(String(otherId));
  }

  const candidates = await User.find({
    _id: { $in: candidateUserIds, $ne: user._id },
    companion_id: null,
  })
    .select('name role profile')
    .lean();

  const planMap = {};
  for (const p of sameSpecialtyPlans) {
    planMap[String(p.user_id)] = p;
  }

  return candidates
    .filter(c => !pairedIds.has(String(c._id)) && planMap[String(c._id)])
    .map(c => {
      const plan = planMap[String(c._id)];
      const samePath = plan.path_id && activePlan.path_id && String(plan.path_id) === String(activePlan.path_id);
      return {
        user_id: c._id,
        name: c.name,
        role: c.role,
        same_path: samePath,
        match_score: samePath ? 95 : 75,
      };
    })
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 10);
}

export async function sendRequest(mobileNumber, toUserId) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const target = await User.findById(toUserId);
  if (!target) throw new ApiError(404, 'Target user not found');
  if (String(target._id) === String(user._id)) throw new ApiError(400, 'Cannot send request to yourself');
  if (target.companion_id) throw new ApiError(400, 'Target user already has a companion');

  const existing = await CompanionRequest.findOne({
    $or: [
      { from_user_id: user._id, to_user_id: target._id },
      { from_user_id: target._id, to_user_id: user._id },
    ],
    status: { $in: ['pending', 'accepted'] },
  });
  if (existing) throw new ApiError(409, 'A request already exists with this user');

  const request = await CompanionRequest.create({
    from_user_id: user._id,
    to_user_id: target._id,
  });

  return { request_id: request._id, status: request.status };
}

export async function respondToRequest(mobileNumber, requestId, action) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const request = await CompanionRequest.findById(requestId);
  if (!request) throw new ApiError(404, 'Request not found');
  if (String(request.to_user_id) !== String(user._id)) throw new ApiError(403, 'This request is not addressed to you');
  if (request.status !== 'pending') throw new ApiError(400, 'Request is no longer pending');

  if (action === 'decline') {
    request.status = 'declined';
    await request.save();
    return { status: 'declined' };
  }

  await User.updateOne({ _id: request.from_user_id }, { $set: { companion_id: user._id } });
  await User.updateOne({ _id: user._id }, { $set: { companion_id: request.from_user_id } });

  request.status = 'accepted';
  await request.save();

  return { status: 'accepted', companion_id: request.from_user_id };
}

export async function getCompanion(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');
  if (!user.companion_id) return null;

  const companion = await User.findById(user.companion_id).select('name role profile').lean();
  if (!companion) return null;

  const companionPlan = await StudyPlan.findOne({ user_id: companion._id, status: 'active' })
    .select('total_duration_months')
    .lean();

  const lessonProgress = companionPlan
    ? await getPlanProgress(companionPlan._id)
    : { total: 0, completed: 0 };

  return {
    user_id: companion._id,
    name: companion.name,
    role: companion.role,
    has_active_plan: !!companionPlan,
    lesson_progress: lessonProgress,
  };
}

export async function getPendingRequests(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const [incoming, outgoing] = await Promise.all([
    CompanionRequest.find({ to_user_id: user._id, status: 'pending' })
      .populate('from_user_id', 'name role')
      .sort({ created_at: -1 })
      .lean(),
    CompanionRequest.find({ from_user_id: user._id, status: 'pending' })
      .populate('to_user_id', 'name role')
      .sort({ created_at: -1 })
      .lean(),
  ]);

  return {
    incoming: incoming.map(r => ({
      request_id: r._id,
      user: { id: r.from_user_id._id, name: r.from_user_id.name, role: r.from_user_id.role },
      created_at: r.created_at,
    })),
    outgoing: outgoing.map(r => ({
      request_id: r._id,
      user: { id: r.to_user_id._id, name: r.to_user_id.name, role: r.to_user_id.role },
      created_at: r.created_at,
    })),
  };
}

async function getPlanProgress(planId) {
  const lessons = await PlanLesson.find({ study_plan_id: planId }).lean();
  const total = lessons.length;
  const completed = lessons.filter(l => l.status === 'completed').length;
  return { total, completed };
}

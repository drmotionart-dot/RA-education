import { User } from './users.model.js';
import { StudyPlan, PlanLesson } from '../studyplan/studyplan.model.js';
import { QuickPickSelection } from '../quickpick/quickpick.model.js';
import { Assessment, AssessmentResponse } from '../assessment/assessment.model.js';
import { SurveySession } from '../survey/survey.model.js';
import { TelegramLink } from '../auth/telegram.model.js';
import { OtpRequest } from '../auth/auth.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function onboardUser(mobileNumber, data) {
  let user = await User.findOne({ mobile_number: mobileNumber });

  if (!user) {
    user = await User.create({
      mobile_number: mobileNumber,
      national_id: data.national_id || null,
      name: data.name || null,
      email: data.email || null,
      role: data.role || null,
      profile: {
        graduation_year: data.graduation_year || null,
        experience_years: data.experience_years || null,
      },
    });
  } else {
    if (data.national_id) user.national_id = data.national_id;
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.role) user.role = data.role;
    if (data.graduation_year != null) user.profile.graduation_year = data.graduation_year;
    if (data.experience_years != null) user.profile.experience_years = data.experience_years;
    await user.save();
  }

  return {
    id: user._id,
    mobile_number: user.mobile_number,
    name: user.name,
    email: user.email,
    role: user.role,
    national_id: user.national_id,
    verification_status: user.verification_status,
    profile: user.profile,
  };
}

export async function getCurrentUser(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });

  if (!user) {
    throw new ApiError(404, 'User not found. Please complete onboarding.');
  }

  return {
    id: user._id,
    mobile_number: user.mobile_number,
    name: user.name,
    email: user.email,
    role: user.role,
    national_id: user.national_id,
    verification_status: user.verification_status,
    profile: user.profile,
    current_plan_id: user.current_plan_id,
  };
}

export async function updateCurrentUser(mobileNumber, data) {
  const user = await User.findOne({ mobile_number: mobileNumber });

  if (!user) {
    throw new ApiError(404, 'User not found. Please complete onboarding.');
  }

  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;

  await user.save();

  return {
    id: user._id,
    mobile_number: user.mobile_number,
    name: user.name,
    email: user.email,
    role: user.role,
    national_id: user.national_id,
    verification_status: user.verification_status,
    profile: user.profile,
    current_plan_id: user.current_plan_id,
  };
}

export async function deleteUserAccount(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });

  if (!user) {
    throw new ApiError(404, 'User not found.');
  }

  const userId = user._id;

  const userStudyPlans = await StudyPlan.find({ user_id: userId }).select('_id');
  const studyPlanIds = userStudyPlans.map(sp => sp._id);

  await Promise.all([
    PlanLesson.deleteMany({ study_plan_id: { $in: studyPlanIds } }),
    QuickPickSelection.deleteMany({ user_id: userId }),
    SurveySession.deleteMany({ user_id: userId }),
    TelegramLink.deleteMany({ mobile_number: mobileNumber }),
    OtpRequest.deleteMany({ mobile_number: mobileNumber }),
  ]);

  const userAssessments = await Assessment.find({ user_id: userId }).select('_id');
  const assessmentIds = userAssessments.map(a => a._id);

  await Promise.all([
    AssessmentResponse.deleteMany({ assessment_id: { $in: assessmentIds } }),
    StudyPlan.deleteMany({ user_id: userId }),
    Assessment.deleteMany({ user_id: userId }),
    User.deleteOne({ _id: userId }),
  ]);
}

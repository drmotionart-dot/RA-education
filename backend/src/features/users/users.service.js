import { User } from './users.model.js';
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

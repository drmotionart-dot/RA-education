import { z } from 'zod';
import { normalizeMobileNumber } from '../../utils/otp.js';

const mobileSchema = z.string().transform(normalizeMobileNumber);

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

const roleEnum = z.enum(['doctor', 'doctor_student', 'nurse', 'nurse_student']);

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile_number: mobileSchema,
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  national_id: z.string().min(1, 'National ID is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female']),
  governorate: z.string().min(1, 'Governorate is required'),
  role: roleEnum,
});

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Mobile number or email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, 'Mobile number or email is required'),
});

export const resetPasswordSchema = z.object({
  identifier: z.string().min(1, 'Mobile number or email is required'),
  code: z.string().length(6, 'OTP code must be exactly 6 digits'),
  new_password: passwordSchema,
});

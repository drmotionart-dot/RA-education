import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import { normalizeMobileNumber } from '../../utils/otp.js';
import * as authController from './auth.controller.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validator.js';

const router = Router();

const mobileSchema = z.string().transform(normalizeMobileNumber);

const requestOTPSchema = z.object({
  mobile_number: mobileSchema,
});

const verifyOTPSchema = z.object({
  mobile_number: mobileSchema,
  code: z.string().length(6, 'OTP code must be exactly 6 digits'),
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.post('/otp/request', validate(requestOTPSchema), authController.requestOTP);
router.post('/otp/verify', validate(verifyOTPSchema), authController.verifyOTP);
router.post('/telegram/webhook', authController.telegramWebhook);

export default router;

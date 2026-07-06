import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import * as usersController from './users.controller.js';

const router = Router();

const onboardSchema = z.object({
  national_id: z.string().optional(),
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email').optional(),
  role: z.enum(['doctor', 'doctor_student', 'nurse', 'nurse_student']).optional(),
  graduation_year: z.number().int().min(1950).max(2100).optional(),
  experience_years: z.number().int().min(0).optional(),
});

router.post('/onboard', authenticate, validate(onboardSchema), usersController.onboard);
router.get('/me', authenticate, usersController.getMe);

export default router;

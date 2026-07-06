import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import * as lessonsController from './lessons.controller.js';

const router = Router();

router.use(authenticate);

const startExamSchema = z.object({
  plan_lesson_id: z.string().min(1, 'plan_lesson_id is required'),
});

const completeSchema = z.object({
  plan_lesson_id: z.string().min(1, 'plan_lesson_id is required'),
  assessment_id: z.string().optional(),
});

const suggestionsSchema = z.object({
  plan_lesson_id: z.string().min(1, 'plan_lesson_id is required'),
});

router.get('/:id', lessonsController.getLesson);
router.get('/:id/resources', lessonsController.getResources);
router.post('/start-exam', validate(startExamSchema), lessonsController.startExam);
router.post('/complete', validate(completeSchema), lessonsController.complete);
router.post('/suggestions', validate(suggestionsSchema), lessonsController.suggestions);

export default router;

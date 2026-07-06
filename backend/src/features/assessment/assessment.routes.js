import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { startAssessmentSchema, submitAnswerSchema } from './assessment.validator.js';
import * as ctrl from './assessment.controller.js';

const router = Router();

router.use(authenticate);

router.post('/start', validate(startAssessmentSchema), ctrl.startAssessment);
router.get('/:id/next', ctrl.getNextQuestion);
router.post('/:id/answer', validate(submitAnswerSchema), ctrl.submitAnswer);
router.get('/:id/results', ctrl.getResults);
router.post('/:id/reallocate', ctrl.reallocatePlan);

export default router;

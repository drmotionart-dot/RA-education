import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { startSurveySchema, answerSurveySchema } from './survey.validator.js';
import * as ctrl from './survey.controller.js';

const router = Router();

router.use(authenticate);

router.post('/start', validate(startSurveySchema), ctrl.startSurvey);
router.post('/:id/answer', validate(answerSurveySchema), ctrl.answerQuestion);
router.get('/:id/state', ctrl.getSessionState);
router.post('/:id/complete', ctrl.completeSurvey);
router.get('/status', ctrl.getSurveyStatus);
router.post('/:id/abandon', ctrl.abandonSurvey);
router.post('/:id/create-plan', ctrl.createPlanFromSurvey);

export default router;

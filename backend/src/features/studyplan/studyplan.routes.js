import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import * as studyplanController from './studyplan.controller.js';

const router = Router();

const generatePlanSchema = z.object({
  quickpick_id: z.string().min(1, 'quickpick_id is required'),
});

router.post('/generate', authenticate, validate(generatePlanSchema), studyplanController.generatePlan);
router.get('/current', authenticate, studyplanController.getCurrentPlan);
router.post('/restart', authenticate, studyplanController.restartPlan);

export default router;

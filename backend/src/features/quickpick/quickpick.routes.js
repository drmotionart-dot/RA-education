import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import * as quickpickController from './quickpick.controller.js';

const router = Router();

const quickPickSchema = z.object({
  specialty_id: z.string().min(1, 'specialty_id is required'),
  path_id: z.string().min(1, 'path_id is required'),
  preset_duration_months: z.number().refine(v => [6, 12, 18, 24].includes(v), 'Must be one of 6, 12, 18, 24'),
});

router.post('/', authenticate, validate(quickPickSchema), quickpickController.createQuickPick);

export default router;

import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import * as companionController from './companion.controller.js';

const router = Router();

const sendRequestSchema = z.object({
  to_user_id: z.string().min(1, 'to_user_id is required'),
});

const respondSchema = z.object({
  request_id: z.string().min(1),
  action: z.enum(['accept', 'decline']),
});

router.get('/match', authenticate, companionController.findMatches);
router.post('/request', authenticate, validate(sendRequestSchema), companionController.sendRequest);
router.post('/respond', authenticate, validate(respondSchema), companionController.respondToRequest);
router.get('/', authenticate, companionController.getCompanion);
router.get('/requests', authenticate, companionController.getPendingRequests);

export default router;

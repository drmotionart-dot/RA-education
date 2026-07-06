import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as lessonsController from './lessons.controller.js';

const router = Router();

router.get('/:id/resources', authenticate, lessonsController.getResources);

export default router;

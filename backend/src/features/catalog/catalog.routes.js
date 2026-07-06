import { Router } from 'express';
import * as catalogController from './catalog.controller.js';

const router = Router();

router.get('/specialties', catalogController.listSpecialties);
router.get('/specialties/:id', catalogController.getSpecialty);
router.get('/paths', catalogController.listPaths);
router.get('/paths/:id', catalogController.getPath);

export default router;

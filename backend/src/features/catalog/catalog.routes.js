import { Router } from 'express';
import * as catalogController from './catalog.controller.js';

const router = Router();

router.get('/specialties', catalogController.listSpecialties);
router.get('/specialties/:id', catalogController.getSpecialty);
router.get('/paths', catalogController.listPaths);
router.get('/paths/:id', catalogController.getPath);

router.get('/compass/paths', catalogController.compassPaths);
router.get('/compass/paths/compare', catalogController.comparePaths);
router.get('/compass/cost-calculator', catalogController.costCalculator);
router.get('/compass/smart-find', catalogController.smartFind);

export default router;

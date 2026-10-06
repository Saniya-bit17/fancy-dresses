import { Router } from 'express';
import {
  saveMeasurements,
  getMeasurements
} from '../controllers/measurements.controller.js';

const router = Router();

router.post('/', saveMeasurements);
router.get('/', getMeasurements);

export default router;

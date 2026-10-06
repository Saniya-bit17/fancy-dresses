import { Router } from 'express';
import { getAllDresses, getDressById } from '../controllers/dresses.controller.js';

const router = Router();

router.get('/', getAllDresses);
router.get('/:id', getDressById);

export default router;

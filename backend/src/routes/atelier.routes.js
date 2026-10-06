import { Router } from 'express';
import { getAtelierInfo } from '../controllers/atelier.controller.js';

const router = Router();

router.get('/', getAtelierInfo);

export default router;

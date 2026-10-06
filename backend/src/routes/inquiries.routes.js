import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  subscribeNewsletter
} from '../controllers/inquiries.controller.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.post('/newsletter', subscribeNewsletter);

export default router;

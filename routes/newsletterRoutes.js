import { Router } from 'express';
import NewsletterController from '../controllers/NewsletterController.js';

const router = Router();
const controller = new NewsletterController();

router.post('/subscribe', controller.subscribe);

export default router;

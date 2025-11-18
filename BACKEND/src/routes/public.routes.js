import { Router } from 'express';
import { listPublicQuizzes } from '../controllers/public.controller.js';

const router = Router();

router.get('/quizzes', listPublicQuizzes);

export default router;



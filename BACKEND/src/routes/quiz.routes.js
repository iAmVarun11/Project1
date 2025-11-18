import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { createQuiz, deleteQuiz, getQuiz, listQuizzes, updateQuiz, validateQuiz } from '../controllers/quiz.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', listQuizzes);
router.get('/:id', getQuiz);
router.post('/', authorizeRoles('teacher', 'admin'), validateQuiz, createQuiz);
router.patch('/:id', authorizeRoles('teacher', 'admin'), updateQuiz);
router.delete('/:id', authorizeRoles('teacher', 'admin'), deleteQuiz);

export default router;



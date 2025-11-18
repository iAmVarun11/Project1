import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { 
  myResults, 
  resultsForQuiz, 
  submitResult, 
  validateSubmission,
  leaderboard
} from '../controllers/result.controller.js';

const router = Router();

router.use(authenticate);

router.get('/my', myResults);
router.get('/quiz/:quizId', authorizeRoles('teacher', 'admin'), resultsForQuiz);

router.get('/leaderboard', authorizeRoles('teacher', 'admin', 'student'), leaderboard);

router.post('/submit', validateSubmission, submitResult);

export default router;

import { Router } from 'express';
import Quiz from '../models/Quiz.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorizeRoles('teacher', 'admin'));

router.get("/overview", async (req, res) => {
  try {
    const teacherId = req.user.id;

    const quizzes = await Quiz.find({ createdBy: teacherId });

    res.json({
      active: quizzes.filter(q => q.isPublished).length,
      upcoming: quizzes.filter(q => !q.isPublished).length,
      completed: quizzes.length,
      quizzes: quizzes.map(q => ({
        _id: q._id,
        title: q.title,
        subject: q.subject || 'N/A'
      })),
      subjects: [...new Set(quizzes.map(q => q.subject).filter(Boolean))]
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;

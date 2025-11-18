import { body, validationResult } from 'express-validator';
import Result from '../models/Result.js';
import Quiz from '../models/Quiz.js';

export const validateSubmission = [
	body('quizId').isString().isLength({ min: 1 }),
	body('answers').isArray(),
	body('answers.*.questionId').isString().isLength({ min: 1 }),
	body('answers.*.selectedOptionIndex').isInt({ min: 0 })
];

function scoreQuiz(quiz, answers) {
	const questionIdToQuestion = new Map();
	for (const q of quiz.questions) {
		questionIdToQuestion.set(q._id.toString(), q);
	}
	let score = 0;
	for (const a of answers) {
		const q = questionIdToQuestion.get(a.questionId.toString());
		if (!q) continue;
		if (a.selectedOptionIndex === q.correctOptionIndex) {
			score += q.points ?? 1;
		}
	}
	return score;
}

export async function submitResult(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { quizId, answers, startedAt } = req.body;
	const quiz = await Quiz.findById(quizId);
	if (!quiz) {
		return res.status(404).json({ message: 'Quiz not found' });
	}
	const score = scoreQuiz(quiz, answers);
	const result = await Result.create({
		quiz: quizId,
		user: req.user.id,
		answers,
		score,
		startedAt: startedAt ? new Date(startedAt) : undefined,
		submittedAt: new Date()
	});
	return res.status(201).json({ result });
}

export async function myResults(req, res) {
	const results = await Result.find({ user: req.user.id })
		.populate('quiz', 'title description')
		.sort({ createdAt: -1 });
	return res.json({ results });
}

export async function resultsForQuiz(req, res) {
	const { quizId } = req.params;
	const quiz = await Quiz.findById(quizId);
	if (!quiz) {
		return res.status(404).json({ message: 'Quiz not found' });
	}
	if (req.user.role !== 'admin' && quiz.createdBy.toString() !== req.user.id.toString()) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	const results = await Result.find({ quiz: quizId })
		.populate('user', 'name email')
		.sort({ createdAt: -1 });
	return res.json({ results });
}

export async function leaderboard(_req, res) {
  const results = await Result.aggregate([
    {
      $group: {
        _id: "$user",
        avgScore: { $avg: "$score" }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    { $sort: { avgScore: -1 } },
    { $limit: 10 }
  ]);

  return res.json({ leaderboard: results });
}


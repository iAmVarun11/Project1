import { body, validationResult } from 'express-validator';
import Quiz from '../models/Quiz.js';

export const validateQuiz = [
	body('title').isString().trim().isLength({ min: 2 }),
	body('description').optional().isString(),
	body('questions').isArray(),
	body('questions.*.text').isString().isLength({ min: 1 }),
	body('questions.*.options').isArray({ min: 2 }),
	body('questions.*.options.*.text').isString().isLength({ min: 1 }),
	body('questions.*.correctOptionIndex').isInt({ min: 0 }),
	body('questions.*.points').optional().isInt({ min: 0 }),
	body('settings').optional().isObject()
];

export async function createQuiz(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const payload = req.body;
	const quiz = await Quiz.create({ ...payload, createdBy: req.user.id });
	return res.status(201).json({ quiz });
}

export async function listQuizzes(req, res) {
	const filter = {};
	if (req.user.role === 'teacher') {
		filter.createdBy = req.user.id;
	}
	const quizzes = await Quiz.find(filter).populate('createdBy', 'name email role').sort({ createdAt: -1 });
	return res.json({ quizzes });
}

export async function getQuiz(req, res) {
	const { id } = req.params;
	const quiz = await Quiz.findById(id).populate('createdBy', 'name email role');
	if (!quiz) {
		return res.status(404).json({ message: 'Quiz not found' });
	}
	return res.json({ quiz });
}

export async function updateQuiz(req, res) {
	const { id } = req.params;
	const quiz = await Quiz.findById(id);
	if (!quiz) {
		return res.status(404).json({ message: 'Quiz not found' });
	}
	if (req.user.role !== 'admin' && quiz.createdBy.toString() !== req.user.id.toString()) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	const updates = req.body;
	Object.assign(quiz, updates);
	await quiz.save();
	return res.json({ quiz });
}

export async function deleteQuiz(req, res) {
	const { id } = req.params;
	const quiz = await Quiz.findById(id);
	if (!quiz) {
		return res.status(404).json({ message: 'Quiz not found' });
	}
	if (req.user.role !== 'admin' && quiz.createdBy.toString() !== req.user.id.toString()) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	await quiz.deleteOne();
	return res.json({ ok: true });
}



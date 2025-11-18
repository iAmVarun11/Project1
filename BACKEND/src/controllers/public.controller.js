import Quiz from '../models/Quiz.js';

export async function listPublicQuizzes(req, res) {
	const { subject } = req.query;
	const filter = { isPublished: true };
	if (subject) {
		filter.subject = subject;
	}
	const quizzes = await Quiz.find(filter)
		.select('title description subject createdAt')
		.sort({ createdAt: -1 });
	return res.json({ quizzes });
}



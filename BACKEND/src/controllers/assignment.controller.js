import { body, validationResult } from 'express-validator';
import Assignment from '../models/Assignment.js';

export const validateAssignment = [
	body('quiz').isString().isLength({ min: 1 }),
	body('assignedTo').isArray(),
	body('assignedTo.*').isString(),
	body('dueDate').optional().isISO8601().toDate(),
	body('notes').optional().isString()
];

export async function createAssignment(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { quiz, assignedTo, dueDate, notes } = req.body;
	const assignment = await Assignment.create({
		quiz,
		assignedTo,
		dueDate,
		notes,
		assignedBy: req.user.id
	});
	return res.status(201).json({ assignment });
}

export async function listAssignments(req, res) {
	const filter = {};
	if (req.user.role === 'teacher') {
		filter.assignedBy = req.user.id;
	}
	if (req.user.role === 'student') {
		filter.assignedTo = req.user.id;
	}
	const assignments = await Assignment.find(filter)
		.populate('quiz', 'title description')
		.populate('assignedBy', 'name email')
		.populate('assignedTo', 'name email')
		.sort({ createdAt: -1 });
	return res.json({ assignments });
}

export async function deleteAssignment(req, res) {
	const { id } = req.params;
	const assignment = await Assignment.findById(id);
	if (!assignment) {
		return res.status(404).json({ message: 'Assignment not found' });
	}
	if (req.user.role !== 'admin' && assignment.assignedBy.toString() !== req.user.id.toString()) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	await assignment.deleteOne();
	return res.json({ ok: true });
}



import User from '../models/User.js';

export async function listUsers(_req, res) {
	const users = await User.find().select('-password').sort({ createdAt: -1 });
	return res.json({ users });
}

export async function updateUser(req, res) {
	const { id } = req.params;
	const { name, role } = req.body;
	const updated = await User.findByIdAndUpdate(
		id,
		{ $set: { name, role } },
		{ new: true, runValidators: true }
	).select('-password');
	if (!updated) {
		return res.status(404).json({ message: 'User not found' });
	}
	return res.json({ user: updated });
}

export async function deleteUser(req, res) {
	const { id } = req.params;
	const deleted = await User.findByIdAndDelete(id);
	if (!deleted) {
		return res.status(404).json({ message: 'User not found' });
	}
	return res.json({ ok: true });
}



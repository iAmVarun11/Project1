import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
	{
		quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
		assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
		dueDate: { type: Date },
		notes: { type: String }
	},
	{ timestamps: true }
);

export default mongoose.model('Assignment', AssignmentSchema);




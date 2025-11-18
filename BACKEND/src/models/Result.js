import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema(
	{
		questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
		selectedOptionIndex: { type: Number, required: true }
	},
	{ _id: false }
);

const ResultSchema = new mongoose.Schema(
	{
		quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		answers: { type: [AnswerSchema], default: [] },
		score: { type: Number, default: 0 },
		startedAt: { type: Date },
		submittedAt: { type: Date }
	},
	{ timestamps: true }
);

ResultSchema.index({ quiz: 1, user: 1 }, { unique: false });

export default mongoose.model('Result', ResultSchema);



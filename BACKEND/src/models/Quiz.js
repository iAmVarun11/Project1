import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema(
	{
		text: { type: String, required: true }
	},
	{ _id: false }
);

const QuestionSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		options: { type: [OptionSchema], validate: (v) => Array.isArray(v) && v.length >= 2 },
		correctOptionIndex: { type: Number, required: true, min: 0 },
		points: { type: Number, default: 1 }
	},
	{ _id: true }
);

const QuizSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		subject: { type: String, trim: true, index: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		questions: { type: [QuestionSchema], default: [] },
		settings: {
			timeLimitMinutes: { type: Number, default: 0 },
			shuffleQuestions: { type: Boolean, default: false }
		},
		isPublished: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

export default mongoose.model('Quiz', QuizSchema);



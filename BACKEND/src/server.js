import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import resultRoutes from './routes/result.routes.js';
import publicRoutes from './routes/public.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Allow multiple origins for development
const allowedOrigins = [
	'http://localhost:5173',
	'http://localhost:5175',
	process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (like mobile apps or curl)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true
	})
);

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (_req, res) => {
	res.json({ ok: true, service: 'quiz-master-backend' });
});

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/results', resultRoutes);

// Errors
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start
connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			// eslint-disable-next-line no-console
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error('Failed to start server:', err.message);
		process.exit(1);
	});

export default app;



import React from 'react';
import '../styles/QuizResultPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const quiz = state?.quiz;
  const totalPoints = state?.totalPoints;

  if (!result || !quiz) {
    return (
      <div className="quiz-result-page">
        <h2>Your Results</h2>
        <p>Result not found. Go to quizzes.</p>
        <button onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
      </div>
    );
  }

  return (
    <div className="quiz-result-page">
      <h2>Your Results</h2>
      <h3>{quiz.title}</h3>
      <p>Score: <b>{result.score}</b>{typeof totalPoints === 'number' ? ` / ${totalPoints}` : ''}</p>
      <button onClick={() => navigate('/quizzes')}>Back to Quizzes</button>
    </div>
  );
};

export default QuizResultPage;

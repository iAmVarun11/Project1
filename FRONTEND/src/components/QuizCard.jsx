import React from 'react';
import '../styles/QuizCard.css';

const QuizCard = ({ subject, image }) => {
  return (
    <div className="quiz-card">
      <img src={image} alt={subject} />
      <h4>{subject}</h4>
    </div>
  );
};

export default QuizCard;
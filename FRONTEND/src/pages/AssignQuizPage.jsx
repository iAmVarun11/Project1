import React from 'react';
import '../styles/AssignQuizPage.css';

const AssignQuizPage = () => {
  return (
    <div className="assign-quiz-page">
      <h2>Assign Quiz</h2>
      <select>
        <option>Select Quiz</option>
        {/* Map through quizzes */}
      </select>
      <select>
        <option>Select Student</option>
        {/* Map through students */}
      </select>
      <input type="datetime-local" />
      <button>Assign Quiz</button>
    </div>
  );
};

export default AssignQuizPage;

import React from 'react';
import '../styles/QuizListPage.css';

const QuizListPage = () => {
  return (
    <div className="quiz-list-page">
      <h2>Quiz List</h2>
      {/* Display all created quizzes */}
      <table>
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through quizzes and display */}
        </tbody>
      </table>
    </div>
  );
};

export default QuizListPage;

import React from 'react';
import '../styles/QuestionBankPage.css';

const QuestionBankPage = () => {
  return (
    <div className="question-bank-page">
      <h2>Question Bank</h2>
      {/* Table of saved questions */}
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through questions and display */}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBankPage;

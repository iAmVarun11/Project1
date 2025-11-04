import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <nav className="sidebar-nav">
        <a href="#">Home</a>
        <a href="#">Quizzes</a>
        <a href="#">Question Bank</a>
        <a href="#">Profile</a>
        <a href="#">Chat</a>
      </nav>
      <div className="quiz-timer">
        <p>Quiz start in</p>
        <div className="timer">00:00:00</div>
      </div>
    </div>
  );
};

export default Sidebar;

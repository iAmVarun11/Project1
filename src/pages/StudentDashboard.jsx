import React from "react";
import { FaBell, FaComments } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../styles/StudentDashboard.css";
import logo from '../assets/logo.jpg';
import chat from '../assets/chat.png';
import notification from '../assets/notification.png';
import book from '../assets/stack_book.png';
import Maths from '../assets/maths.png';
import Chemistry from '../assets/chemistry.jpeg';
import Physics from '../assets/phy.jpg';

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h3>Welcome<br /><span>Student’s Name</span></h3>
        </div>

        <nav className="nav-links">
          <NavLink to="/student/home">Home</NavLink>
          <NavLink to="/student/quizzes">Quizzes</NavLink>
          <NavLink to="/student/questions">Question Bank</NavLink>
          <NavLink to="/student/profile">Profile</NavLink>
          <NavLink to="/student/chat">Chat</NavLink>
        </nav>

        <div className="quiz-timer">
          <p>Quiz starts in</p>
          <div className="timer-box">00:00:00</div>
          <img src={book} alt="Books" className="books-img" />
        </div>

        <button className="logout-btn">
          <MdLogout size={20} /> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <input type="text" placeholder="Search quizzes" className="search-bar" />
          <div className="header-icons">
            <img src={chat} alt="chat" />
            <img src={notification} alt="notification" />
          </div>
        </div>

        <div className="active-quizzes">
          <div className="section-title">
            <h2>Active Quizzes</h2>
            <button className="see-all">See all</button>
          </div>
          <div className="quiz-cards">
            <div className="quiz-card">
              <img src={Maths} alt="Math" />
              <p>Mathematics</p>
            </div>
            <div className="quiz-card">
              <img src={Chemistry} alt="Chemistry" />
              <p>Chemistry</p>
            </div>
            <div className="quiz-card">
              <img src={Physics} alt="Physics" />
              <p>Physics</p>
            </div>
          </div>
        </div>

        <div className="statistics-section">
          <div className="exam-stats">
            <h3>Exam Grade Statistics</h3>
            <img src="https://i.ibb.co/jyZ1kKr/graph.png" alt="Graph" />
          </div>

          <div className="summary-cards">
            <div className="summary-box">
              <p>Total Quizzes</p>
              <h2>10+</h2>
            </div>
            <div className="summary-box">
              <p>Completed</p>
              <h2>5</h2>
            </div>
            <div className="summary-box">
              <p>Achievements</p>
              <div className="medals">
                <img src="https://cdn-icons-png.flaticon.com/512/2583/2583346.png" alt="Bronze" />
                <img src="https://cdn-icons-png.flaticon.com/512/2583/2583345.png" alt="Silver" />
                <img src="https://cdn-icons-png.flaticon.com/512/2583/2583346.png" alt="Bronze" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
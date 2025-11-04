import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img 
            src="C:\Users\gaur6\OneDrive\Desktop\hello\quiz_master\src\assets\images\Logo.jpg" 
            alt="Quiz Master" 
          />
        </Link>
      </div>
      
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/quizzes' ? 'active' : ''}>
          <Link to="/quizzes">Quizzes</Link>
        </li>
        <li className={location.pathname === '/question-bank' ? 'active' : ''}>
          <Link to="/question-bank">Question Bank</Link>
        </li>
        <li className={location.pathname === '/chat' ? 'active' : ''}>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
      
      <div className="navbar-user">
        <div className="user-avatar">
          <img 
            src="C:\Users\gaur6\OneDrive\Desktop\hello\quiz_master\src\assets\images\UserLogo.jpg" 
            alt="User profile picture - smiling person with blue background" 
          />
        </div>
        <div className="user-dropdown">
          <span>John Doe</span>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

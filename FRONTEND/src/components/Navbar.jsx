// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImg from '../assets/logo.jpg';
import userLogoImg from '../assets/UserLogo.jpg';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="Quiz Master" />
        </Link>
      </div>

      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname.startsWith('/quizzes') ? 'active' : ''}>
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
          <img src={user?.avatarUrl || userLogoImg} alt="User profile" />
        </div>
        <div className="user-dropdown">
          <span>{user?.name || 'Guest'}</span>
          <div className="dropdown-content" role="menu">
            <Link to="/student/profile">Profile</Link>
            <Link to="/student/profile">Settings</Link>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

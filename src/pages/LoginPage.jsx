import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import quizImage from '../assets/quiz-graphic.png';
import logo from '../assets/logo.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login
    if (role === 'Student') {
      navigate('/student-dashboard');
    } else if (role === 'Teacher') {
      navigate('/teacher-dashboard');
    } else if (role === 'Admin') {
      navigate('/admin-dashboard'); // Optional
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <img src={quizImage} alt="Quiz Visual" />
        </div>
        <div className="auth-right">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h1 className="auth-title">QuizMaster</h1>
          <h2 className="auth-subtitle">Login</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>I am</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>

            <button type="submit" className="auth-button">Login</button>

            <div className="auth-links">
              <a href="/forgot-password">Forgot Password?</a>
              <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

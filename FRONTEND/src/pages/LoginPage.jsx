// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import quizImage from '../assets/quiz-graphic.png';
import logo from '../assets/logo.jpg';
import { apiLogin, apiMe } from '../api/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // login user
      await apiLogin({ email, password });

      // fetch user profile
      const { user } = await apiMe();
      const userRole = user?.role?.toLowerCase() || role.toLowerCase();

      // save role
      localStorage.setItem("auth_role", userRole);

      // correct routing
      if (userRole === 'student') {
        navigate("/student/dashboard");
      } 
      else if (userRole === 'teacher') {
        navigate("/teacher/dashboard");
      } 
      else if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } 
      else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message || "Login failed");
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value.toLowerCase())}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="auth-button">Login</button>

            {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

            <div className="auth-links">
              <a href="/forgot-password">Forgot Password?</a>
              <p>Don’t have an account? <a href="/signup">Sign Up</a></p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import '../styles/SignUpPage.css';
import quizImage from '../assets/quiz-graphic.png'; // Rename your uploaded image
import logo from '../assets/logo.jpg';
import { apiRegister } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiRegister({ name, email, password, role });
      // After register, user is logged in; route by selected role
      const roleLower = role.toLowerCase();
      if (roleLower === 'student') {
        navigate('/student-dashboard');
      } else if (roleLower === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (roleLower === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Sign up failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* Left Side */}
        <div className="signup-left">
          <img src={quizImage} alt="Quiz Graphic" className="quiz-image" />
        </div>

        {/* Right Side */}
        <div className="signup-right">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="app-name">QuizMaster</h1>
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit" className="signup-btn">Sign Up</button>
            {error ? <p style={{ color: 'red', marginTop: 8 }}>{error}</p> : null}
            <p className="switch-login">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

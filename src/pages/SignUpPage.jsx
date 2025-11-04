import React, { useState } from 'react';
import '../styles/SignUpPage.css';
import quizImage from '../assets/quiz-graphic.png'; // Rename your uploaded image
import logo from '../assets/logo.jpg';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sign-up logic here
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

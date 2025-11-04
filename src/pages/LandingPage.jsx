import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Features from '../components/Features';
import CTA from '../components/CTA';
import '../styles/LandingPage.css';
import logo from '../assets/logo.jpg';

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="landing-page">
      
      
      <div className="hero-section">
        <div className="logo-section">
          <img src={logo} alt="QuizMaster Logo" />
          <h1>QuizMaster</h1>
        </div>

        <div className="text-section">
          <p className="tagline">Empowering Smart Assessments for Modern Education</p>
          <p className="subtext">Analyze quizzes with our comprehensive platform designed for students.</p>
        </div>

        <div className="cta-buttons">
          <button className="primary" onClick={() => navigate('/login')}>Login &gt;</button>
          <button className="secondary" onClick={() => navigate('/signup')}>Sign up</button>
        </div>

        <Features />
        <CTA />
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;

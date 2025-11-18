import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Quiz Master</h3>
          <p>
            An interactive educational platform for teachers and students 
            to create, take, and manage quizzes efficiently.
          </p>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="icon email"></i> contact@eduquiz.com</p>
          <p><i className="icon phone"></i> +1 (555) 123-4567</p>
          <div className="social-icons">
            <a href="#"><i className="social-icon facebook"></i></a>
            <a href="#"><i className="social-icon twitter"></i></a>
            <a href="#"><i className="social-icon linkedin"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import "../styles/Features.css";
import book from '../assets/book.jpg';

import student from '../assets/student.jpg';
import medal from '../assets/medal.jpg';
const Features = () => (
  <section>
    <h2>Everything You Need for Digital Assessment</h2>
    <p>Powerful tools for students to take tests and analyze quizzes.</p>
    <div className="features">
      <div className="feature-card">
        <h3><img src={book} alt="Exam Prep" /><br />Exam Preparation</h3>
        <p>Prepare efficiently with question banks, practice sets, and revision modules.</p>
      </div>
      <div className="feature-card">
        <h3><img src={student}alt="Student Management" /><br />Student Management</h3>
        <p>Assign quizzes, track participation, and manage access easily.</p>
      </div>
      <div className="feature-card">
        <h3><img src={medal} alt="Analytics"/><br />Analytics & Reports</h3>
        <p>Generate performance and learning outcome reports.</p>
      </div>
    </div>
  </section>
);

export default Features;

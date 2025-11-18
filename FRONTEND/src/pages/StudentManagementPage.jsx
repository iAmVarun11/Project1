import React from 'react';
import '../styles/StudentManagementPage.css';

const StudentManagementPage = () => {
  return (
    <div className="student-management-page">
      <h2>Student Management</h2>
      <input type="email" placeholder="Add Student by Email" />
      <button>Add Student</button>
      {/* List of added students */}
      <ul>
        {/* Map through students */}
      </ul>
    </div>
  );
};

export default StudentManagementPage;

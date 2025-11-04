import React from 'react';

import '../styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Welcome, Teacher!</h2>
        <div className="quick-stats">
          {/* Quick stats overview */}
        </div>
        {/* Navigation cards or sidebar */}
      </div>
    </div>
  );
};

export default TeacherDashboard;

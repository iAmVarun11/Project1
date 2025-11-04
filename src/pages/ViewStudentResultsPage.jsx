import React from 'react';
import '../styles/ViewStudentResultsPage.css';

const ViewStudentResultsPage = () => {
  return (
    <div className="view-student-results-page">
      <h2>Student Results</h2>
      {/* List of students with performance summary */}
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Quiz Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through students */}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudentResultsPage;

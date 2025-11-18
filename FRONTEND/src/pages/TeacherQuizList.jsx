import React, { useEffect, useState } from "react";
import TeacherSidebar from "../components/TeacherSidebar";
import "../styles/TeacherQuizList.css";
import { httpRequest } from "../api/http";

export default function TeacherQuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    const res = await httpRequest("/teacher/quizzes", { method: "GET" });
    setQuizzes(res.quizzes || []);
  }

  return (
    <div className="tq-root">
      <TeacherSidebar />

      <div className="tq-main">
        <h2>All Quizzes</h2>

        <div className="tq-list">
          {quizzes.length === 0 ? (
            <p>No quizzes found.</p>
          ) : (
            quizzes.map((q) => (
              <div key={q._id} className="tq-item">
                <h3>{q.title}</h3>
                <p>Subject: {q.subject}</p>
                <p>Status: {q.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// src/pages/StudentResultsPage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/StudentResultsPage.css";
import { httpRequest } from "../api/http";

export default function StudentResultsPage() {
  const [subjects, setSubjects] = useState(["Mathematics", "Science", "History"]);
  const [activeSubject, setActiveSubject] = useState("Mathematics");
  const [result, setResult] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeSubject]);

  async function loadData() {
    try {
      const meRes = await httpRequest("/auth/me", { method: "GET" });
      setMe(meRes.user);

      const res = await httpRequest(`/results/subject/${activeSubject}`, { method: "GET" });
      setResult(res);
    } catch (err) {
      console.log(err);
    }
  }

  const scorePercent = result ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <div className="results-page">
      <Sidebar />

      <div className="results-body">

        {/* HEADER */}
        <div className="results-header">
          <div className="back-icon">←</div>
          <h2>Results</h2>

          <div className="user-box">
            <img src={me?.avatarUrl || "/src/assets/UserLogo.jpg"} alt="pfp" />
            <span>{me?.name || "Varun"}</span>
          </div>
        </div>

        {/* SUBJECT TABS */}
        <div className="results-tabs">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={activeSubject === sub ? "tab active" : "tab"}
              onClick={() => setActiveSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* MAIN QUIZ SUMMARY */}
        <div className="results-main-box">
          <div className="left-box">
            <h1>{activeSubject} Quiz</h1>
            <p className="score">Score: {result?.score} / {result?.total}</p>
            <p className="result-status">
              {scorePercent >= 40 ? "Passed" : "Failed"}
            </p>
          </div>

          {/* DONUT CHART */}
          <div className="donut-box">
            <svg viewBox="0 0 36 36" className="donut-chart">
              <path
                className="bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress"
                strokeDasharray={`${scorePercent}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="donut-value">{scorePercent}%</div>
            <p className="donut-status">
              {scorePercent >= 40 ? "Passed" : "Failed"}
            </p>
          </div>
        </div>

        {/* QUESTIONS REVIEW */}
        <div className="question-grid">
          {result?.questions?.map((q, i) => (
            <div className="question-card" key={i}>
              <h3>Question {i + 1}</h3>

              <p>
                Your answer:{" "}
                <span className={q.isCorrect ? "correct" : "incorrect"}>
                  {q.isCorrect ? "Correct ✓" : "Incorrect ✗"}
                </span>
              </p>

              {!q.isCorrect && (
                <p>
                  Correct answer: <strong>{q.correctAnswer}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

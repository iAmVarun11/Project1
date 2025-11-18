import React, { useEffect, useState } from "react";
import TeacherSidebar from "../components/TeacherSidebar";
import "../styles/TeacherDashboard.css";
import { httpRequest } from "../api/http";

export default function TeacherDashboard() {
  const [me, setMe] = useState(null);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const meRes = await httpRequest("/auth/me", { method: "GET" });
    const ovRes = await httpRequest("/teacher/overview", { method: "GET" });

    setMe(meRes.user);
    setOverview(ovRes);
  }

  return (
    <div className="td-root">
      <TeacherSidebar />

      <div className="td-main">
        {/* Top Bar */}
        <div className="td-top">
          <div className="td-search">
            <input placeholder="Search…" />
          </div>
          <div className="td-user">
            <img src={me?.avatar || "/src/assets/UserLogo.jpg"} />
            <div>
              <h4>{me?.name}</h4>
              <span>Teacher</span>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="td-overview">

          <div className="td-card blue">
            <h4>Active Quizzes</h4>
            <p>{overview?.active || 0}</p>
          </div>

          <div className="td-card purple">
            <h4>Upcoming Quizzes</h4>
            <p>{overview?.upcoming || 0}</p>
          </div>

          <div className="td-card pink">
            <h4>Completed</h4>
            <p>{overview?.completed || 0}</p>
          </div>

        </div>

        {/* Lower section — Assign & Courses */}
        <div className="td-grid">
          <div className="td-card large">
            <h3>Assign Quizzes</h3>
            {overview?.quizzes?.map((q) => (
              <div key={q._id} className="assign-row">
                <span>{q.title}</span>
                <span>{q.classSection}</span>
              </div>
            ))}
          </div>

          <div className="td-card large">
            <h3>Your Courses</h3>
            {overview?.subjects?.map((s) => (
              <div key={s} className="course-item">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

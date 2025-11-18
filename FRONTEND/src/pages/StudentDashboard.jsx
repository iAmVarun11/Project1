// src/pages/StudentDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { httpRequest } from "../api/http";
import "../styles/StudentDashboard.css";
import { FiBell, FiSettings } from "react-icons/fi";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [results, setResults] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    async function loadAll() {
      setLoading(true);
      try {
        const [meRes, resultsRes, assignRes, quizRes, lbRes] = await Promise.all([
          httpRequest("/auth/me", { method: "GET" }).catch(() => ({})),
          httpRequest("/results/my", { method: "GET" }).catch(() => ({ results: [] })),
          httpRequest("/assignments", { method: "GET" }).catch(() => ({ assignments: [] })),
          httpRequest("/quizzes", { method: "GET" }).catch(() => ({ quizzes: [] })),
          httpRequest("/results/leaderboard", { method: "GET" }).catch(() => ({ leaderboard: [] }))
        ]);

        if (!active) return;

        setMe(meRes.user || null);
        setResults(resultsRes.results || []);
        setAssignments(assignRes.assignments || []);
        setQuizzes(quizRes.quizzes || []);
        setLeaderboard((lbRes?.leaderboard || []).map(it => ({
          _id: it._id,
          avgScore: it.avgScore,
          user: it.user || (it._id ? { name: it._id.toString() } : { name: "Unknown" })
        })));
      } catch (err) {
        // console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadAll();
    return () => (active = false);
  }, []);

  const stats = useMemo(() => {
    const completed = results.length;
    // Active = published quizzes
    const activeCount = quizzes.filter(q => q.isPublished).length;
    // Upcoming = based on assignments that have dueDate in future
    const now = Date.now();
    const upcoming = assignments.filter(a => a.dueDate && new Date(a.dueDate).getTime() > now).length;
    const avgScore = results.length ? Math.round(results.reduce((s, r) => s + (r.score || 0), 0) / results.length) : 0;
    const subjects = Array.from(new Set((quizzes || []).map(q => q.subject).filter(Boolean))).slice(0, 6);
    return { active: activeCount, upcoming, completed, avgScore, subjects };
  }, [results, quizzes, assignments]);

  const recentScores = results.slice(0, 6);

  if (loading) {
    return (
      <div className="sd-loading">
        <Sidebar />
        <div className="sd-loading-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="sd-root">
      <Sidebar />

      <div className="sd-content">
        {/* topbar */}
        <div className="sd-topbar">
          <div className="sd-top-left">
            <div className="sd-search">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quizzes, assignments..."
              />
            </div>
          </div>

          <div className="sd-top-right">
            <div className="sd-icons">
              <button className="icon-btn" title="Notifications"><FiBell /></button>
              <button className="icon-btn" title="Settings" onClick={() => navigate("/student/profile")}><FiSettings /></button>
            </div>

            <div className="sd-user">
              <div className="sd-user-text">
                <div className="sd-name">{me?.name || "Student"}</div>
                <div className="sd-role">{me?.role ? me.role.charAt(0).toUpperCase() + me.role.slice(1) : "Student"}</div>
              </div>
              <img className="sd-avatar" src={me?.avatarUrl || "/src/assets/UserLogo.jpg"} alt="avatar" />
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="sd-grid">
          {/* left column */}
          <div className="sd-col-main">
            {/* Overview */}
            <div className="sd-card sd-overview">
              <h3>Quiz Overview</h3>
              <div className="sd-overview-row">
                <div className="overview-box light-blue">
                  <div className="label">Active Quizzes</div>
                  <div className="value">{stats.active}</div>
                </div>
                <div className="overview-box light-purple">
                  <div className="label">Upcoming Quizzes</div>
                  <div className="value">{stats.upcoming}</div>
                </div>
                <div className="overview-box light-pink">
                  <div className="label">Completed Quizzes</div>
                  <div className="value">{stats.completed}</div>
                </div>
              </div>
            </div>

            {/* bottom two columns inside main */}
            <div className="sd-row-cards">
              <div className="sd-card sd-scores">
                <h4>Recent Scores</h4>
                <div className="sd-list">
                  {recentScores.length === 0 ? <div className="muted">No results yet</div> : recentScores.map(r => (
                    <div className="sd-list-row" key={r._id}>
                      <div className="left">{r.quiz?.title || "Quiz"}</div>
                      <div className="right">{r.score}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sd-card sd-assignments">
                <h4>Assignments</h4>
                <ul className="assignment-list">
                  {assignments.length === 0 ? <li className="muted">No assignments</li> : assignments.slice(0,6).map(a => (
                    <li key={a._id}>
                      <div className="assign-title">{a.quiz?.title || a.notes || "Assignment"}</div>
                      <div className="assign-meta">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No due date"}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Courses & leaderboard small */}
            <div className="sd-row-cards">
              <div className="sd-card sd-courses">
                <h4>Your Courses</h4>
                <div className="courses-list">
                  {stats.subjects.length === 0 ? <div className="muted">No courses</div> :
                    stats.subjects.map(s => <span className="course-pill" key={s}>{s}</span>)
                  }
                </div>
              </div>

              <div className="sd-card sd-leaderboard-small">
                <h4>Leaderboard</h4>
                {leaderboard.length === 0 ? <div className="muted">No leaderboard data</div> : (
                  leaderboard.slice(0,3).map((l,i) => (
                    <div className="leader-row" key={l._id || i}>
                      <div className="leader-avatar">{(l.user?.name || "U").slice(0,1)}</div>
                      <div className="leader-name">{l.user?.name}</div>
                      <div className="leader-score">{Math.round(l.avgScore)}%</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* right column */}
          <aside className="sd-col-side">
            <div className="sd-card sd-performance">
              <h4>Performance Analytics</h4>
              <div className="perf-wrap">
                <svg className="progress-ring" viewBox="0 0 36 36">
                  <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831" />
                  <path
                    className="ring-progress"
                    strokeDasharray={`${stats.avgScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
                  />
                </svg>
                <div className="perf-number">{stats.avgScore}%</div>
              </div>
              <div className="perf-label">Your Average Score</div>
            </div>

            <div className="sd-card sd-assignments-compact">
              <h4>Upcoming</h4>
              <ul className="compact-list">
                {assignments.slice(0,6).map(a => (
                  <li key={a._id}>
                    <div>{a.quiz?.title || a.notes}</div>
                    <div className="date">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : '-'}</div>
                  </li>
                ))}
                {assignments.length === 0 && <li className="muted">No upcoming</li>}
              </ul>
            </div>

            <div className="sd-card sd-leaderboard-big">
              <h4>Leaderboard</h4>
              {leaderboard.length === 0 ? <div className="muted">No data</div> : leaderboard.slice(0,5).map((l, idx) => (
                <div className="leaderboard-row" key={l._id || idx}>
                  <div className="avatar-small">{(l.user?.name || "U").slice(0,1)}</div>
                  <div className="leader-info">
                    <div className="name">{l.user?.name}</div>
                    <div className="meta">{Math.round(l.avgScore)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

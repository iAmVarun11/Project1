// src/components/TeacherSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  FiGrid,
  FiUsers,
  FiClipboard,
  FiMessageSquare,
  FiLogOut
} from "react-icons/fi";

export default function TeacherSidebar() {
  return (
    <aside className="app-sidebar">

      <div className="brand">
        <img src="/src/assets/logo.jpg" className="brand-logo-img" />
        <div className="brand-name">Teacher Panel</div>
      </div>

      <nav className="side-nav">

        <NavLink to="/teacher/dashboard" className="nav-item">
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/teacher/quizzes" className="nav-item">
          <FiClipboard />
          <span>Quizzes</span>
        </NavLink>

        <NavLink to="/teacher/students" className="nav-item">
          <FiUsers />
          <span>Students</span>
        </NavLink>

        <NavLink to="/teacher/chat" className="nav-item">
          <FiMessageSquare />
          <span>Messages</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item logout" onClick={() => {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_role");
          window.location.href = "/login";
        }}>
          <FiLogOut /><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

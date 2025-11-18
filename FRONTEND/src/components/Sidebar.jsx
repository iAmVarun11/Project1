// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

import {
  FiGrid,
  FiClipboard,
  FiBookOpen,
  FiBarChart2,
  FiMessageSquare,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

import logoImage from "../assets/logo.jpg";

export default function Sidebar() {
  return (
    <aside className="app-sidebar">

      {/* BRAND */}
      <div className="brand">
        <img src={logoImage} alt="logo" className="brand-logo-img" />
        <div className="brand-name">QuizMaster</div>
      </div>

      {/* NAVIGATION */}
      <nav className="side-nav">

        <NavLink
          to="/student/dashboard"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/student/quizzes"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <FiClipboard />
          <span>Quizzes</span>
        </NavLink>

        <NavLink
          to="/question-bank"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <FiBookOpen />
          <span>Question Bank</span>
        </NavLink>

        {/* RESULTS LINK - FIXED */}
        <NavLink
          to="/student/results"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <FiBarChart2 />
          <span>Results</span>
        </NavLink>

       <NavLink
  to="/student/chat"
  className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
>
  <FiMessageSquare />
  <span>Messages</span>
</NavLink>


        <NavLink
          to="/student/settings"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* LOGOUT BUTTON */}
      <div className="sidebar-bottom">
        <button
          className="nav-item logout"
          onClick={() => {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_role");
            window.location.href = "/login";
          }}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

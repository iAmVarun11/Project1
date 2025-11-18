// src/pages/StudentSettingsPage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/StudentSettingsPage.css";

import {
  FiUser,
  FiMail,
  FiCamera,
  FiSettings,
  FiLock,
  FiBell
} from "react-icons/fi";

import { httpRequest } from "../api/http";

export default function StudentSettingsPage() {
  const [tab, setTab] = useState("settings");
  const [me, setMe] = useState(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await httpRequest("/auth/me");
      setMe(res.user);
      setName(res.user.name);
      setPreview(res.user.avatarUrl || "");
    } catch (err) {
      console.error(err);
    }
  }

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file)); // UI preview only
  }

  async function saveProfile() {
    try {
      await httpRequest("/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          password: password ? password : undefined
        })
      });

      alert("Profile Updated Successfully");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="settings-container">
      <Sidebar />

      <div className="settings-main">
        <div className="settings-title">Settings</div>

        <div className="settings-wrapper">

          {/* LEFT MENU */}
          <div className="settings-menu">

            <div
              className={`menu-item ${tab === "settings" ? "active" : ""}`}
              onClick={() => setTab("settings")}
            >
              <FiSettings /> <span>Settings</span>
            </div>

            <div
              className={`menu-item ${tab === "account" ? "active" : ""}`}
              onClick={() => setTab("account")}
            >
              <FiUser /> <span>Account</span>
            </div>

            <div
              className={`menu-item ${tab === "security" ? "active" : ""}`}
              onClick={() => setTab("security")}
            >
              <FiLock /> <span>Security</span>
            </div>

            <div
              className={`menu-item ${tab === "notifications" ? "active" : ""}`}
              onClick={() => setTab("notifications")}
            >
              <FiBell /> <span>Notifications</span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="settings-content">

            <h2>Edit Profile</h2>

            {/* AVATAR */}
            <div className="avatar-section">
              <img
                src={preview || "https://placehold.co/120x120"}
                alt="avatar"
                className="avatar-img"
              />

              <label className="avatar-edit-btn">
                <FiCamera size={20} />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
              </label>
            </div>

            {/* FULL NAME */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter full name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="save-btn" onClick={saveProfile}>
              Save
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

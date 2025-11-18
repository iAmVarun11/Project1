// src/pages/StudentChatPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/StudentChatPage.css";
import { FiPaperclip, FiMenu } from "react-icons/fi";

export default function StudentChatPage() {
  const [messages, setMessages] = useState([
    {
      from: "teacher",
      text: "Could you please help me with the assignment?",
      time: "9:40 AM",
    },
    {
      from: "student",
      text: "Sure, what do you need help with?",
      time: "9:41 AM",
    },
    {
      from: "teacher",
      text: "I'm having trouble with question 5.",
      time: "9:41 AM",
    },
  ]);

  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      from: "student",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setInput("");

    // fake typing indicator
    setTyping(true);
    setTimeout(() => setTyping(false), 1500);
  };

  return (
    <div className="chat-root">
      <Sidebar />

      <div className="chat-content">
        {/* TOP BAR */}
        <div className="chat-topbar">
          <div className="chat-search">
            <input type="text" placeholder="Search..." />
          </div>

          <div className="chat-user-info">
            <img src="/src/assets/UserLogo.jpg" className="chat-avatar" />
            <div className="chat-user-meta">
              <div className="chat-user-name">Varun</div>
              <div className="chat-user-role">Student</div>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="chat-header">
          <div className="teacher-info">
            <img src="/src/assets/teacher.png" className="teacher-avatar" />
            <div>
              <div className="teacher-name">Mrs. Smith</div>
              <div className="teacher-status">Online</div>
            </div>
          </div>

          <div className="chat-icons">
            <FiPaperclip className="icon" />
            <FiMenu className="icon" />
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === "student" ? "msg msg-right" : "msg msg-left"
              }
            >
              <div className="msg-text">{msg.text}</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))}

          {typing && <div className="typing-indicator">... is typing</div>}
        </div>

        {/* INPUT BOX */}
        <div className="chat-input-box">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="send-btn">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

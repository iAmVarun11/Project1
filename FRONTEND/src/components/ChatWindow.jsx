// src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatWindow.css';

const ChatWindow = ({ isOpen, onClose, title = 'Chat' }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msg = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, msg]);

    // Mock response (replace later with real backend)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'Teacher',
          text: 'Thanks — I will check and get back to you.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        }
      ]);
    }, 800);

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chat-window ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="chat-header">
        <h3>{title}</h3>
        <button className="close-chat" onClick={onClose} aria-label="Close chat">×</button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <img
              src="https://placehold.co/200x200"
              alt="No messages yet illustration"
            />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message ${message.isCurrentUser ? 'sent' : 'received'}`}>
              {!message.isCurrentUser && (
                <div className="message-avatar">
                  <img src="https://placehold.co/30x30" alt={`${message.sender} avatar`} />
                </div>
              )}
              <div className="message-content">
                {!message.isCurrentUser && <span className="message-sender">{message.sender}</span>}
                <div className="message-text">{message.text}</div>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          aria-label="Type message"
        />
        <button type="submit" aria-label="Send">
          <i className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

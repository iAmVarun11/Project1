import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatWindow.css';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // In a real app, this would be sent to a server
    setMessages([...messages, {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    }]);
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Teacher',
        text: 'Thank you for your message. I will get back to you soon.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false
      }]);
    }, 1000);
    
    setNewMessage('');
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chat-window ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        <h3>Chat with Teacher</h3>
        <button className="close-chat" onClick={onClose}>×</button>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <img 
              src="https://placehold.co/200x200" 
              alt="No messages yet illustration - empty chat bubble icon with friendly smile" 
            />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.isCurrentUser ? 'sent' : 'received'}`}
            >
              {!message.isCurrentUser && (
                <div className="message-avatar">
                  <img 
                    src="https://placehold.co/30x30" 
                    alt={`${message.sender}'s profile picture`} 
                  />
                </div>
              )}
              <div className="message-content">
                {!message.isCurrentUser && (
                  <span className="message-sender">{message.sender}</span>
                )}
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
        />
        <button type="submit">
          <i className="send-icon"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

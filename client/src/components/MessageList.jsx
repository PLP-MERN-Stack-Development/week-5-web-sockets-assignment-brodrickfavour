// MessageList.jsx

import React from 'react';

const MessageList = ({ messages = [] }) => {
  return (
    <div className="space-y-2 p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="bg-gray-100 p-2 rounded shadow-sm"
        >
          <div className="text-sm text-gray-700 font-semibold">{msg.username}</div>
          <div className="text-base">{msg.text}</div>
          <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

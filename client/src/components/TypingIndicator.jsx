// TypingIndicator.jsx

import React from 'react';

const TypingIndicator = ({ typingUsers = [] }) => {
  if (typingUsers.length === 0) return null;

  return (
    <div className="text-sm italic text-gray-500 p-2">
      {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
    </div>
  );
};

export default TypingIndicator;

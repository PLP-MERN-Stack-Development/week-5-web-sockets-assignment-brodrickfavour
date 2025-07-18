import { useState } from 'react';

const ChatRoom = ({
  sendMessage = () => console.warn('sendMessage not provided'),
  setTyping = () => console.warn('setTyping not provided'),
  messages = [],
  typingUsers = [],
  username = 'Anonymous'
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    setTyping(true);

    // Automatically reset typing after 2s
    setTimeout(() => setTyping(false), 2000);
  };

  return (
    <div className="p-4 w-full max-w-xl mx-auto">
      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto bg-white rounded shadow p-4 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.username === username ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-semibold">{msg.username}</p>
              <p className="text-base">{msg.text}</p>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 mb-2">
          {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
        </div>
      )}

      {/* Message Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';

const socket = io('http://localhost:3000'); // Adjust the URL if different

const App = () => {
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!hasJoined) return;

    // Notify server of join
    socket.emit('join', username);

    // Handle incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle typing notification
    socket.on('typing', (user) => {
      setTypingUsers((prev) => {
        if (!prev.includes(user)) return [...prev, user];
        return prev;
      });

      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== user));
      }, 2000);
    });

    return () => {
      socket.off('receive_message');
      socket.off('typing');
    };
  }, [hasJoined, username]);

  const sendMessage = (text) => {
    const message = {
      username,
      text,
      timestamp: Date.now(),
    };
    socket.emit('send_message', message);
    setMessages((prev) => [...prev, message]);
  };

  const setTyping = (typing) => {
    if (typing && !isTyping) {
      socket.emit('typing', username);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setHasJoined(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!hasJoined ? (
        <form onSubmit={handleJoin} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Join Chat</h2>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border p-2 mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Join
          </button>
        </form>
      ) : (
        <ChatRoom
          sendMessage={sendMessage}
          setTyping={setTyping}
          messages={messages}
          typingUsers={typingUsers}
          username={username}
        />
      )}
    </div>
  );
};

export default App;

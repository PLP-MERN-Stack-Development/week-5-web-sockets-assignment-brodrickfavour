// client/src/components/UsernameModal.jsx
import { useState } from 'react';

function UsernameModal({ onSetUsername }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSetUsername(input.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Enter a Username</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-4"
          placeholder="Your name"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Join Chat
        </button>
      </form>
    </div>
  );
}

export default UsernameModal;

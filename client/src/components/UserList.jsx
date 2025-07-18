// UserList.jsx

import React from 'react';

const UserList = ({ users = [] }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="font-semibold mb-2">Online Users</h2>
      <ul className="space-y-1">
        {users.map((user, index) => (
          <li key={index} className="text-green-600">{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

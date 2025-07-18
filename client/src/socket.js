// client/src/socket.js
import { io } from 'socket.io-client';

let socket;

export const useSocket = () => {
  const connect = (username) => {
    socket = io(import.meta.env.VITE_API_URL);
    socket.emit('join', { username });
  };

  const disconnect = () => {
    if (socket) socket.disconnect();
  };

  const on = (event, callback) => {
    if (socket) socket.on(event, callback);
  };

  const emit = (event, payload) => {
    if (socket) socket.emit(event, payload);
  };

  return { connect, disconnect, on, emit, socket };
};

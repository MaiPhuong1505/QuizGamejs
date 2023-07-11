import { io } from 'socket.io-client';
const URL = process.env.SOCKET_URL || 'http://localhost:5001';
export const socket = io(URL);

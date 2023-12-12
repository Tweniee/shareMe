// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Replace with your actual frontend domain
    methods: ['GET', 'POST'],
  },
});
app.use(cors());

// Socket.IO connection handling
io.on('connection', (socket: any) => {
  console.log('A user connected');
  // Join a room
  socket.on('joinRoom', (room: any) => {
    socket.join(room);
    // socket.Broadcast.to(room).emit('User added');
    console.log(`User joined room: ${room}`);
  });

  // Handle messages from clients
  socket.on('shareMe', (obj: { id: string; message: string }) => {
    console.log('message::::: ' + JSON.stringify(obj.message));
    // Broadcast the message to all connected clients
    io.in(obj.id).emit('message', obj.message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

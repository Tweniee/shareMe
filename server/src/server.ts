// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Redis from 'ioredis';
import { runVmCode } from './service/vm.server';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Replace with your actual frontend domain
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
const redis = new Redis();
const code: string = 'function x() {\n\tconsole.log("Welcome!");\n}';
// Socket.IO connection handling
io.on('connection', (socket: any) => {
  // Join a room
  socket.on('joinRoom', async (room: any) => {
    socket.join(room);
    // socket.Broadcast.to(room).emit('User added');
    const item = await redis.get(room);
    if (item != null && item != '') {
      io.in(room).emit('message', item);
    } else {
      io.in(room).emit('message', code);
      await redis.set(room, code, 'EX', 300 * 60);
    }
    console.log(`User joined room: ${room}`);
  });

  // Handle messages from clients
  socket.on('shareMe', async (obj: { id: string; message: string }) => {
    try {
      await redis.set(obj.id, obj.message, 'EX', 300 * 60);

      // Broadcast the message to all connected clients
      const item = await redis.get(obj.id);
      const result = runVmCode(obj.message);
      io.in(obj.id).emit('message', item);
      io.in(obj.id).emit('outputAfterExicution', result);
    } catch (error) {
      console.error('Error in shareMe event:', error);
    }
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

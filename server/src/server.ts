// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectionSocket } from './service/sockets/connection.socket';
import { compileTypescriptCode } from './service/typescript/typescript.service';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Replace with your actual frontend domain
    methods: ['GET', 'POST'],
  },
});
app.use(cors());


connectionSocket(io);
// compileTypescriptCode("");


// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { joinRoomSockets } from './joinRoom.socket';
import { shareMeSocket } from './shareMe.socket';
import { Redis } from 'ioredis';


const redis = new Redis();
const code: string = 'function x() {\n\tconsole.log("Welcome!");\n}';
export const connectionSocket = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on('connection', (socket: any) => {
    // Join a room
    joinRoomSockets(socket, io, redis, code);

    // Handle messages from clients
    shareMeSocket(socket, io, redis);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

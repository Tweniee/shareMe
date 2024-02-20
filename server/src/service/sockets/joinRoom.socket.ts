import { Redis } from 'ioredis';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { runVmCode } from '../vm.server';

export const joinRoomSockets = (
  socket: any,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis,
  code: string
) => {
  socket.on('joinRoom', async (room: any) => {
    socket.join(room);
    // socket.Broadcast.to(room).emit('User added');
    const item = await redis.get(room);

    if (item != null && item != '') {
      io.in(room).emit('message', item);
      const result = runVmCode(item);
      io.in(room).emit('outputAfterExicution', result);
    } else {
      io.in(room).emit('message', code);
      const result = runVmCode(code);
      io.in(room).emit('outputAfterExicution', result);
      await redis.set(room, code, 'EX', 300 * 60);
    }
    console.log(`User joined room: ${room}`);
  });
};

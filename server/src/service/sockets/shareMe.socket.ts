import { Redis } from 'ioredis';
import { runVmCode } from '../vm.server';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server } from 'socket.io';

export const shareMeSocket = (
  socket: any,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis // Handle messages from clients
) =>
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
{
}

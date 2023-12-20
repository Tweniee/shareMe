// socket.service.ts
import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public output$: BehaviorSubject<string> = new BehaviorSubject('');
  // constructor(private socket: Socket) {}
  constructor() {
    this.socket = io(environment.socketUrl);
  }

  joinRoom(id: string) {
    this.socket.emit('joinRoom', id);
  }

  sendTextMessageWithId(obj: { id: string; message: string }) {
    this.socket.emit('shareMe', obj );
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
  public getOutputAfterExicution = () => {
    this.socket.on('outputAfterExicution', (message) =>{
      this.output$.next(message);
    });

    return this.output$.asObservable();
  };
}

import { Injectable } from '@nestjs/common';
import {Server, Socket} from "socket.io";
import {Message} from "@models";
import {WsException} from "@nestjs/websockets";

@Injectable()
export class WsServerMessagesService {
  setNameHandler(name: string, socket: Socket, server: Server) : void {
    socket.data.name = name;
    this.connectionHandler(socket, server);
  }

  connectionHandler(socket: Socket, server: Server) : void {
    server.emit('user-online', socket.data.name);
  }

  disconnectHandler(socket: Socket, server: Server) : void {
    server.emit('user-offline', socket.data.name);
  }

  getOnlineClientsHandler(server: Server): void {
    server
      .sockets
      .sockets
      .forEach(s => this.connectionHandler(s, server));
  }

  async sendMessageHandler(message: Message, socket: Socket, server: Server) : Promise<void> {
    return this.send(message, socket, server);
  }

  async updateMessageHandler(message: Message, socket: Socket, server: Server) : Promise<void> {
    return this.send(message, socket, server, 'update-message');
  }

  async deleteMessageHandler(message: Message, socket: Socket, server: Server) : Promise<void> {
    return this.send(message, socket, server, 'delete-message');
  }

  private  async send(message: Message, socket: Socket, server: Server, event: string = 'message') : Promise<void> {
    return new Promise((resolve, reject) => {
      if(!message) {
        return reject(new WsException('Message is not valid!'));
      }

      const recipient = message.iduserto;
      const sender = message.iduserfrom;

      server
        .sockets
        .sockets
        .forEach(s => {
          recipient && (s.data.name === recipient || s.data.name === sender) && s.emit(event, message);
        })
      resolve();
    })
  }
}

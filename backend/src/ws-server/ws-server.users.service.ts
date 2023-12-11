import {Injectable} from "@nestjs/common";
import {Server, Socket} from "socket.io";

@Injectable()
export class WsServerUsersService {
  async blockUserHandler(userid: string, reason: string, socket: Socket, server:Server) : Promise<void> {
    return this.send(userid, socket, server, 'block-user', reason);
  }
  async deleteUserHandler(userid: string, socket: Socket, server: Server): Promise<void> {
    return this.send(userid, socket, server, 'delete-user');
  }

  async send(userid: string, socket: Socket, server: Server, event: string, ...params: unknown[]) : Promise<void> {
    return new Promise((resolve) => {
      server
        .sockets
        .sockets
        .forEach(s => {
          s.data.name === userid && s?.emit(event, ...params);
        });
      resolve();
    })
  }
}
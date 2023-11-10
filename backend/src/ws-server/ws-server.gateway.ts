import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {WsServerService} from "./ws-server.service";
import {Message} from "@models";
import {UseFilters} from "@nestjs/common";
import {WsExceptionFilter} from "@filters";

@WebSocketGateway()
@UseFilters(WsExceptionFilter)
export class WsServerGateway {
  @WebSocketServer()
  server : Server;

  constructor(
    private readonly wsServerService: WsServerService
  ) {}

  @SubscribeMessage('set-name')
  setNameHandler(@MessageBody('name') name: string, @ConnectedSocket() socket: Socket) : void {
    console.log(name);
    return this.wsServerService.setNameHandler(name, socket);
  }

  @SubscribeMessage('send-message')
  async messageSendHandler(@MessageBody('message') message : Message, @ConnectedSocket() socket) : Promise<void> {
    console.log(message);
    return await this.wsServerService.sendMessageHandler(message, socket, this.server);
  }
}
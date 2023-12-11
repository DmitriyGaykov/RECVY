import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {WsServerMessagesService} from "./ws-server.messages.service";
import {Message} from "@models";
import {UseFilters} from "@nestjs/common";
import {WsExceptionFilter} from "@filters";
import {WsServerUsersService} from "./ws-server.users.service";
import {BlockUserDto} from "./dto";

@WebSocketGateway(3002, { cors: { origin: "http://localhost:5173"}})
@UseFilters(WsExceptionFilter)
export class WsServerGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server : Server;

  constructor(
    private readonly wsServerMessagesService: WsServerMessagesService,
    private readonly wsServerUsersService: WsServerUsersService
  ) {}

  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    this.wsServerMessagesService.disconnectHandler(socket, this.server);
  }

  @SubscribeMessage('block-user')
  async blockUserHandler(@MessageBody() { userid, reason } : BlockUserDto, @ConnectedSocket() socket: Socket) : Promise<void> {
    return await this.wsServerUsersService.blockUserHandler(userid, reason, socket, this.server);
  }

  @SubscribeMessage('get-online-users')
  getOnlineUsersHandler(): void {
    return this.wsServerMessagesService.getOnlineClientsHandler(this.server);
  }

  @SubscribeMessage('set-name')
  setNameHandler(@MessageBody('name') name: string, @ConnectedSocket() socket: Socket) : void {
    return this.wsServerMessagesService.setNameHandler(name, socket, this.server);
  }

  @SubscribeMessage('send-message')
  async messageSendHandler(@MessageBody() message : Message, @ConnectedSocket() socket) : Promise<void> {
    return await this.wsServerMessagesService.sendMessageHandler(message, socket, this.server);
  }

  @SubscribeMessage('update-message')
  async updateMessageHandler(@MessageBody() message: Message, @ConnectedSocket() socket) : Promise<void> {
    return await this.wsServerMessagesService.updateMessageHandler(message, socket, this.server);
  }

  @SubscribeMessage('delete-message')
  async deleteMessageHandler(@MessageBody() message: Message, @ConnectedSocket() socket) : Promise<void> {
    return await this.wsServerMessagesService.deleteMessageHandler(message, socket, this.server);
  }

  @SubscribeMessage('delete-user')
  async deleteUserHandler(@MessageBody() userid: string, @ConnectedSocket() socket) : Promise<void> {
    return await this.wsServerUsersService.deleteUserHandler(userid, socket, this.server);
  }
}
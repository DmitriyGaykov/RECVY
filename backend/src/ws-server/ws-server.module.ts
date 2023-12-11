import { Module } from '@nestjs/common';
import { WsServerMessagesService } from './ws-server.messages.service';
import {WsServerGateway} from "./ws-server.gateway";
import {WsServerUsersService} from "./ws-server.users.service";

@Module({
  providers: [WsServerMessagesService, WsServerGateway, WsServerUsersService],
  exports: [WsServerGateway]
})
export class WsServerModule {}

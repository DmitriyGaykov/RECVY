import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {WsException} from "@nestjs/websockets";
import {Socket} from "socket.io";

@Catch()
export class WsExceptionFilter implements ExceptionFilter<WsException> {
  catch(exception: WsException, host: ArgumentsHost) : void  {
    const socket : Socket  = host.switchToWs().getClient<Socket>();
    socket.emit('error', exception.message)
  }
}

import { Body, Controller, Post, UseInterceptors, UsePipes } from "@nestjs/common";
import { MessagesService } from './messages.service';
import { AuthAs } from '@decorators';
import { Roles } from '../users/roles';
import { SendMessageDto } from "./dto/send-message.dto";
import { Message } from "@models";
import { AppValidationPipe } from "@pipes";
import { IsThisUserInterceptor } from "@interceptors";

@Controller('messages')
@AuthAs(Roles.user)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService
  ) {}

  @Post()
  @UsePipes(AppValidationPipe)
  @UseInterceptors(IsThisUserInterceptor)
  async sendMessage(@Body() message : SendMessageDto) : Promise<Message> {
    return await this.messagesService.sendMessage(message);
  }
}

import { Body, Controller, Get, Post, Query, UseInterceptors, UsePipes } from "@nestjs/common";
import { MessagesService } from './messages.service';
import { AuthAs, InjectUser } from "@decorators";
import { Roles } from '../users/roles';
import { SendMessageDto } from "./dto/send-message.dto";
import { Message, User } from "@models";
import { AppValidationPipe, TryParseIntPipe } from "@pipes";
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

  @Get()
  async getMessages(
    @InjectUser() { id } : User,
    @Query('iduserto') iduserto : string,
    @Query('page', TryParseIntPipe) page?: number) : Promise<Message[]> {
    return await this.messagesService.getMessages(id, iduserto, page);
  }
}

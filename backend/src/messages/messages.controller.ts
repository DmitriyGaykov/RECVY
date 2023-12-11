import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { MessagesService } from './messages.service';
import { AuthAs, InjectUser } from "@decorators";
import { Roles } from '../users/roles';
import { SendMessageDto } from "./dto/send-message.dto";
import { Message, User } from "@models";
import { AppValidationPipe, TryParseIntPipe } from "@pipes";
import {IsMainAdminInterceptor, IsThisUserInterceptor} from "@interceptors";
import { IsSuitDataToDellOrEditMsgGuard } from "@guards";
import {InjectMessage} from "@decorators";

@Controller('messages')
@AuthAs(Roles.user)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService
  ) {}

  @Post()
  @UsePipes(AppValidationPipe)
  @UseInterceptors(IsThisUserInterceptor, IsMainAdminInterceptor)
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
  @Patch()
  @UseGuards(IsSuitDataToDellOrEditMsgGuard)
  async editMessage(@Body('message', AppValidationPipe) message: string, @Query('messageid') messageid : string) : Promise<void> {
    return await this.messagesService.editMessage(messageid, message);
  }

  @Delete()
  @UseGuards(IsSuitDataToDellOrEditMsgGuard)
  async deleteMessage(
    @InjectUser() { id } : User,
    @InjectMessage() message: Message
  ) : Promise<void> {
    return await this.messagesService.deleteMessage(message);
  }
}

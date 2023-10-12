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
import { IsThisUserInterceptor } from "@interceptors";
import { IsSuitDataToDellOrEditMsgGuard } from "@guards";
import { EditMessageDto } from "./dto/edit-message.dto";

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
  @Patch()
  @UseGuards(IsSuitDataToDellOrEditMsgGuard)
  async editMessage(@Body('message', AppValidationPipe) message: string, @Query('messageid') messageid : string) : Promise<void> {
    return await this.messagesService.editMessage(messageid, message);
  }

  @Delete()
  @UseGuards(IsSuitDataToDellOrEditMsgGuard)
  async deleteMessage(
    @InjectUser() { id } : User,
    @Query('messageid') messageid : string,
    @Query('userid') userid : string
  ) : Promise<void> {
    messageid && await this.messagesService.deleteMessage(messageid);
    userid && await this.messagesService.deleteChat(id, userid);
  }
}

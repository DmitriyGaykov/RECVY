import { Controller, Delete, Get, Query } from "@nestjs/common";
import { Chat, User } from '@models';
import { AuthAs, InjectUser } from '@decorators';
import { TryParseIntPipe } from '@pipes';
import { Roles } from '../users/roles';
import { ChatsService } from "./chats.service";

@Controller('chats')
@AuthAs(Roles.user)
export class ChatsController {
  constructor(
    private readonly chatsService : ChatsService
  ) {}

  @Get()
  async getChat(
    @InjectUser() {id}: User,
    @Query('page', TryParseIntPipe) page?: number,
    @Query('userid') userid?: string
  ): Promise<Chat[] | Chat> {
    if(userid != null)
      return await this.chatsService.getChat(id, userid);
    return await this.chatsService.getChats(id, page);
  }

  @Delete()
  async deleteChat(@InjectUser() {id} : User, @Query('userid') userid: string): Promise<void> {
    return await this.chatsService.deleteChat(id, userid);
  }
}

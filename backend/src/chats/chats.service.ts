import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Chat } from "@models";
import { getSkipAndTake } from "@utils";
import { ChatsDbService } from "./chats-db.service";
import { FilesService } from "../files/files.service";

@Injectable()
export class ChatsService {
  private static readonly CNW_CHATS : number = 15;
  constructor(
    private readonly chatsDbService : ChatsDbService,
    private readonly filesService : FilesService
  ) {}

  async getChats(userid : string, page?: number) : Promise<Chat[]> {
    try {
      const {skip, take} = getSkipAndTake(page, ChatsService.CNW_CHATS);
      const chats = await this.chatsDbService.getChats(userid, skip, take);
      return chats.map(el => {
        el.photo = this.filesService.getNameForUserImg(el.photo);
        return el;
      })
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteChat(iduser1: string, iduser2: string) : Promise<void> {
    try {
      await this.chatsDbService.deleteChat(iduser1, iduser2);
    } catch (e : unknown) {
      throw new NotFoundException(e);
    }
  }
}

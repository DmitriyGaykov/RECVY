import { BadRequestException, Injectable } from "@nestjs/common";
import { MessagesDbService } from "./messages-db.service";
import { Message } from "@models";
import { SendMessageDto } from "./dto/send-message.dto";
import { getSkipAndTake } from "@utils";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

@Injectable()
export class MessagesService {
  private static readonly MAX_MESSAGES_COUNT_FOR_TIME = 15;
  constructor(
    private readonly messagesDbService: MessagesDbService,
    private readonly exceptionManagerService: ExceptionManagerService
  ) {}

  async sendMessage(message : SendMessageDto) : Promise<Message> {
    try {
      return await this.messagesDbService.sendMessage(message);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getMessages(iduserfrom : string, iduserto : string, page?: number) : Promise<Message[]> {
    try {
      const { skip, take } = getSkipAndTake(page, MessagesService.MAX_MESSAGES_COUNT_FOR_TIME);
      return await this.messagesDbService.getMessages(iduserfrom, iduserto, skip, take);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  private async getMessageById(idmessage : string) : Promise<Message | undefined> {
    try {
      return await this.messagesDbService.getMessageById(idmessage);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async editMessage(idmessage : string, message : string) : Promise<void> {
    try {
      return await this.messagesDbService.editMessage(idmessage, message);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteMessage(idmessage : string) : Promise<void> {
    try {
      return await this.messagesDbService.deleteMessage(idmessage);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteChat(iduserfrom : string, iduserto : string) : Promise<void> {
    try {
      return await this.messagesDbService.deleteChat(iduserfrom, iduserto);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

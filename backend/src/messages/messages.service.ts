import { BadRequestException, Injectable } from "@nestjs/common";
import { MessagesDbService } from "./messages-db.service";
import { Message } from "@models";
import { SendMessageDto } from "./dto/send-message.dto";

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesDbService: MessagesDbService
  ) {}

  async sendMessage(message : SendMessageDto) : Promise<Message> {
    try {
      return await this.messagesDbService.sendMessage(message);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

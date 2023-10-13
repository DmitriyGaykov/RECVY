import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { MessagesDbService } from "./messages-db.service";
import { Message, MessageType, Sticker } from "@models";
import { SendMessageDto } from "./dto/send-message.dto";
import { getSkipAndTake } from "../utils/scripts";
import { StickersService } from "../admin/stickers/stickers.service";

@Injectable()
export class MessagesService {
  private static readonly MAX_MESSAGES_COUNT_FOR_TIME = 15;
  constructor(
    private readonly messagesDbService: MessagesDbService,
    private readonly stickersService: StickersService
  ) {}

  async sendMessage(message: SendMessageDto): Promise<Message> {
    try {
      const _message = await this.messagesDbService.sendMessage(message);

      if (_message.messagetype === MessageType.STICKER) {
        try {
          const sticker = await this.stickersService.getStickerById(_message.message);
          _message.message = sticker?.sticker;
        } catch (e : unknown) {
          throw new InternalServerErrorException();
        }
      }

      return _message;
    } catch (e: unknown) {
      throw e instanceof HttpException ? e : new BadRequestException(e);
    }
  }

  async getMessages(
    iduserfrom: string,
    iduserto: string,
    page?: number,
  ): Promise<Message[]> {
    try {
      const { skip, take } = getSkipAndTake(
        page,
        MessagesService.MAX_MESSAGES_COUNT_FOR_TIME,
      );
      const messages = await this.messagesDbService.getMessages(
        iduserfrom,
        iduserto,
        skip,
        take,
      );

      let sticker : Sticker;

      for (const el of messages) {
        if(el.messagetype === MessageType.STICKER) {
          sticker = await this.stickersService.getStickerById(el.message);
          el.message = sticker?.sticker;
        }
      }

      return messages;
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }

  private async getMessageById(
    idmessage: string,
  ): Promise<Message | undefined> {
    try {
      return await this.messagesDbService.getMessageById(idmessage);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }

  async editMessage(idmessage: string, message: string): Promise<void> {
    try {
      return await this.messagesDbService.editMessage(idmessage, message);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteMessage(idmessage: string): Promise<void> {
    try {
      return await this.messagesDbService.deleteMessage(idmessage);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { SendMessageDto } from "./dto/send-message.dto";
import { Message } from "@models";
import { IError } from "../exception-manager/interfaces/error.interface";
import * as pg_promise from "pg-promise";
@Injectable()
export class MessagesDbService {
  constructor(
    @Inject('app-user-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}

  async sendMessage(message : SendMessageDto) : Promise<Message> {
    try {
      return await this.pgp.one("select * from sendMessage(${iduserfrom}, ${iduserto}, ${message}, ${messagetype})", message);
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getMessages(iduserfrom : string, iduserto : string, skip?: number, take?: number) : Promise<Message[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.pgp.any("select * from getMessages(${iduserfrom}, ${iduserto}, ${skip}, ${take})", { iduserfrom, iduserto, skip, take });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getMessageById(idmessage : string) : Promise<Message | undefined> {
    try {
      if(idmessage == null)
        return undefined;
      return await this.pgp.one("select * from getMessageById(${idmessage})", { idmessage });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async editMessage(idmessage : string, message : string) : Promise<void> {
    try {
      await this.pgp.none('call editMessage(${idmessage}, ${message})', { idmessage, message });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deleteMessage(idmessage : string) : Promise<void> {
    try {
      await this.pgp.none('call dellMessage(${idmessage})', { idmessage });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

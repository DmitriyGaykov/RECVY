import { Inject, Injectable } from "@nestjs/common";
import * as pg_promise from 'pg-promise';
import { Chat } from "@models";
import { IError } from "../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

@Injectable()
export class ChatsDbService {
  constructor(
    @Inject('app-user-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}

  async getChats(userid: string, skip?: number, take?: number) : Promise<Chat[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.pgp.any("select * from getChats(${userid}, ${skip}, ${take})", {userid, skip, take});
    } catch (e : unknown) {
      const err = e as IError;
      this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getChat(iduser1: string, iduser2: string) : Promise<Chat | null> {
    try {
      return await this.pgp.oneOrNone("select * from getChat(${iduser1}, ${iduser2})", {
        iduser1,
        iduser2
      })
    } catch (e: unknown) {
      const err = e as IError;
      this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deleteChat(iduser1: string, iduser2: string) : Promise<void> {
    try {
      await this.pgp.none('call dellChat(${iduser1}, ${iduser2})', {iduser1, iduser2});
    } catch (e : unknown) {
      console.log(e);
      const err = e as IError;
      this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

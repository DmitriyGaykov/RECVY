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
}
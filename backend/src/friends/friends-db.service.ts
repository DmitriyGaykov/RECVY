import { Inject, Injectable } from "@nestjs/common";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { IError } from "../exception-manager/interfaces/error.interface";
import * as pg_promise from "pg-promise";
import { User } from "@models";

@Injectable()
export class FriendsDbService {
  constructor(
    @Inject('app-user-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async addFriend(who: string, whom: string) : Promise<void> {
    try {
      await this.pgp.none("call addFriend(${who}, ${whom})", { who, whom });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deleteFromFriends(who: string, whom: string) : Promise<void> {
    try {
      await this.pgp.none("call deleteFromFriends(${who}, ${whom})", { who, whom });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getFriendsOf(userid: string, skip?: number, take?: number) : Promise<User[]> {
    try {
      skip ??= null;
      take ??= null;
      return await this.pgp.any("select * from getFriendsOf(${userid}, ${skip}, ${take})", { userid, skip, take });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

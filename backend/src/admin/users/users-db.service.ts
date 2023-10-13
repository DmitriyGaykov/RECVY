import { Inject, Injectable } from "@nestjs/common";
import * as pg_promise from "pg-promise";
import { IError } from "../../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { BlockedUser } from "@models";

@Injectable()
export class UsersDbService {
  constructor(
    @Inject('app-admin-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async blockUser(id: string, reason: string) : Promise<void> {
    try {
      await this.pgp.none("call blockUser(${id}, ${reason})", { id, reason });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async unBlockUser(id: string) : Promise<void> {
    try {
      await this.pgp.none('call unblockUser($1)', [id]);
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getBlockedUsers(skip?: number, take?: number) : Promise<BlockedUser[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.pgp.any('select * from getBlockedUsers(${skip}, ${take})', {skip, take});
    } catch (e : unknown) {
      console.log(e);
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deleteUser(userid : string) : Promise<void> {
    try {
      await this.pgp.none("call deleteuser(${userid})", { userid })
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

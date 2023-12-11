import {Inject, Injectable} from "@nestjs/common";
import {IError} from "../exception-manager/interfaces/error.interface";
import {ExceptionManagerService} from "../exception-manager/exception-manager.service";
import * as pg_promise from "pg-promise";
import {User} from "@models";

@Injectable()
export class SubscribersDbService {
  constructor(
    @Inject('app-user-connection') private readonly pgp: pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService: ExceptionManagerService
  ) {
  }

  async subscribe(who: string, whom: string): Promise<void> {
    try {
      await this.pgp.none("call subscribe(${who}, ${whom})", {who, whom});
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async describe(who: string, whom: string): Promise<void> {
    try {
      await this.pgp.none("call describe(${who}, ${whom})", {who, whom});
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getSubscribersOf(userid: string, searchText?: string, skip?: number, take?: number): Promise<User[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.pgp.any("select * from searchSubs(${stext}, ${userid}, ${skip}, ${take})", {
        stext: searchText || "",
        userid,
        skip,
        take
      });
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async isSubscribingExist(_who: string, _on: string): Promise<boolean> {
    try {
      _who ??= null;
      _on ??= null;

      return (await this.pgp.oneOrNone("select * from isSubscribingExist(${_who}, ${_on})", {
        _who,
        _on
      })).issubscribingexist;
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

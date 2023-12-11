import { Inject, Injectable } from "@nestjs/common";
import { Sticker } from "@models";
import { IError } from "../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import * as pg_promise from 'pg-promise';

@Injectable()
export class StickersDbService {
  constructor(
    @Inject('app-user-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async getStickers(skip?: number, take?: number) : Promise<Sticker[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.pgp.any('select * from getstickers(${skip}, ${take})', {skip, take});
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

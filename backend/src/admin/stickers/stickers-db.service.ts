import { Inject, Injectable } from "@nestjs/common";
import * as pg_promise from 'pg-promise';
import { IError } from "../../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { Sticker } from "@models";

@Injectable()
export class StickersDbService {
  constructor(
    @Inject('app-admin-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async addSticker(sticker: string) : Promise<void> {
    try {
      await this.pgp.none("call addSticker(${sticker})", { sticker });
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deleteSticker(stickerId : string) : Promise<void> {
    try {
      await this.pgp.none("call deleteSticker(${stickerId})", { stickerId });
    } catch (e: unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async getStickerById(stickerId : string) : Promise<Sticker | undefined> {
    try {
      return await this.pgp.oneOrNone("select * from getstickerbyid(${stickerId})", { stickerId })
    } catch (e : unknown) {
      console.log(e);
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

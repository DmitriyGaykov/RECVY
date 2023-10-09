import { Inject, Injectable } from "@nestjs/common";
import { IError } from "../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import * as pg_promise from "pg-promise";

@Injectable()
export class PhotosDbService {
  constructor(
    private readonly exceptionManagerService : ExceptionManagerService,
    @Inject('app-user-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>
  ) {}

  async addPhotoToUser(userId: string, photo: string) : Promise<void> {
    try {
      return await this.pgp.none("call addPhoto(${userId}, ${photo})", { userId, photo });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }

  async deletePhotoFromUser(userId: string, photo: string) : Promise<void> {
    try {
      return await this.pgp.none("call dellPhoto(${userId}, ${photo})", { userId, photo });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

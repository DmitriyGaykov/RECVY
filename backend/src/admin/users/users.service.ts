import {BadRequestException, HttpException, Injectable, NotFoundException} from "@nestjs/common";
import { UsersDbService } from "./users-db.service";
import {BlockedUser, User, UserBlockInfo} from "@models";
import { changePhotoPathFor, getSkipAndTake } from "../../utils/scripts";
import { UsersService as _UsersService } from './../../users/users.service'
import { FilesService } from "../../files/files.service";
import {Response} from "express";

@Injectable()
export class UsersService {
  private static readonly CNT_USER_FOR_TIME: number = 10;

  constructor(
    private readonly usersDbService : UsersDbService,
    private readonly _usersService : _UsersService,
    private readonly filesService : FilesService
  ) {}

  async getBlockReason(userid: string) : Promise<string> {
    try {
      const info: string = await this.usersDbService.getBlockReason(userid);
      if(!info) throw null;
      return info;
    } catch {
      throw new NotFoundException();
    }
  }

  async isUserBlocked(userid: string) : Promise<void> {
    try {
      const info = await this.usersDbService.isUserBlocked(userid);
      if(!info.isblocked) throw null;
    } catch {
      throw new NotFoundException();
    }
  }

  async blockUser(id: string, reason: string) : Promise<void> {
    try {
      return await this.usersDbService.blockUser(id, reason);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async unBlockUser(id: string) : Promise<void> {
    try {
      return await this.usersDbService.unBlockUser(id);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getBlockedUsers(page?: number, searchText: string = '') : Promise<BlockedUser[]> {
    try {
      const {skip, take} = getSkipAndTake(page, UsersService.CNT_USER_FOR_TIME);

      const users = await this.usersDbService.getBlockedUsers(searchText, skip, take);
      return users.map(user => changePhotoPathFor(user));
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteUser(userid: string) : Promise<void> {
    try {
      const user = await this._usersService.getUserById(userid);

      if(!user) {
        throw {
          error: "Пользователя не сущетсвует"
        }
      }

      await this.usersDbService.deleteUser(userid);

      let photo : string;

      for (const el of user.photos) {
        photo = el.split('/').at(-1);
        await this.filesService.deleteUserFile(photo);
      }
    } catch (e : unknown) {
      throw e instanceof HttpException ? e : new BadRequestException(e);
    }
  }
}

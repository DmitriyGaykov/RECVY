import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { UsersDbService } from "./users-db.service";
import { BlockedUser, User } from "@models";
import { changePhotoPathFor, getSkipAndTake } from "../../utils/scripts";
import { UsersService as _UsersService } from './../../users/users.service'
import { FilesService } from "../../files/files.service";

@Injectable()
export class UsersService {
  private static readonly CNT_USER_FOR_TIME: number = 8;

  constructor(
    private readonly usersDbService : UsersDbService,
    private readonly _usersService : _UsersService,
    private readonly filesService : FilesService
  ) {}

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

  async getBlockedUsers(page?: number) : Promise<BlockedUser[]> {
    try {
      const {skip, take} = getSkipAndTake(page, UsersService.CNT_USER_FOR_TIME);

      const users = await this.usersDbService.getBlockedUsers(skip, take);
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
      const err = e as HttpException;
      throw err.getStatus() === 400 ? e : new BadRequestException(e);
    }
  }
}

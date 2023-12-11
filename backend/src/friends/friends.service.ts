import { BadRequestException, Injectable } from "@nestjs/common";
import { FriendsDbService } from "./friends-db.service";
import { User } from "@models";
import {changePhotoPathFor, getSkipAndTake} from "../utils/scripts";

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsDbService: FriendsDbService,
  ) {}

  async addFriend(who: string, whom: string) : Promise<void> {
    try {
      who ??= null;
      whom ??= null;

      await this.friendsDbService.addFriend(who, whom);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteFromFriends(who: string, whom: string) : Promise<void> {
    try {
      who ??= null;
      whom ??= null;

      await this.friendsDbService.deleteFromFriends(who, whom);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getFriendsOf(userid : string, page: number, searchText?: string) : Promise<User[]> {
    try {
      const {skip, take} = getSkipAndTake(page, 10);
      userid ??= null;
      const users = await this.friendsDbService.getFriendsOf(userid, searchText, skip, take);
      return users.map(el => changePhotoPathFor(el));
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async thisFriendExists(userid : string, whom : string) : Promise<void> {
    try {
      userid ??= null;
      whom ??= null;
      const res = await this.friendsDbService.thisFriendExists(userid, whom);
      if(!res)
        throw undefined;
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

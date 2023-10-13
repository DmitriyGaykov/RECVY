import { BadRequestException, Injectable } from "@nestjs/common";
import { FriendsDbService } from "./friends-db.service";
import { User } from "@models";
import { changePhotoPathFor } from "../utils/scripts";

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

  async getFriendsOf(userid : string) : Promise<User[]> {
    try {
      userid ??= null;
      const users = await this.friendsDbService.getFriendsOf(userid);
      return users.map(el => changePhotoPathFor(el));
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import { SubscribersDbService } from "./subscribers-db.service";
import { User } from "@models";
import { changePhotoPathFor, getSkipAndTake } from "@utils";

@Injectable()
export class SubscribersService {
  private static readonly CNT_USERS_PER_PAGE = 10;

  constructor(
    private readonly subscribersDbService: SubscribersDbService
  ) {}

  async subscribe(who:  string, whom : string) : Promise<void> {
    try {
      who ??= null;
      whom ??= null;

      await this.subscribersDbService.subscribe(who, whom);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async describe(who: string, whom: string) : Promise<void> {
    try {
      who ??= null;
      whom ??= null;

      await this.subscribersDbService.describe(who, whom);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getSubscribersOf(userid: string, page?: number) : Promise<User[]> {
    try {
      userid ??= null;
      const { skip, take } = getSkipAndTake(page, SubscribersService.CNT_USERS_PER_PAGE);
      const users = await this.subscribersDbService.getSubscribersOf(userid, skip, take);
      return users.map(user => changePhotoPathFor(user));
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

import {Controller, Delete, Get, Head, Post, Query} from "@nestjs/common";
import { AuthAs, InjectUser } from "@decorators";
import { Roles } from '../users/roles';
import { User } from "@models";
import { FriendsService } from "./friends.service";
import { TryParseIntPipe } from "@pipes";

@Controller('friends')
@AuthAs(Roles.user)
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService
  ) {}

  @Head()
  async thisFriendExists(@Query('userid') userid : string, @Query('whom') whom : string) : Promise<void> {
    await this.friendsService.thisFriendExists(userid, whom);
  }
  @Get()
  async getFriends(@Query('userid') userid: string, @Query('page', TryParseIntPipe) page: number, @Query('searchText') searchText?: string) : Promise<User[]> {
    return await this.friendsService.getFriendsOf(userid, page, searchText);
  }

  @Post()
  async addFriend(@InjectUser() user : User, @Query('whom') add : string) : Promise<void> {
    return await this.friendsService.addFriend(user.id, add);
  }

  @Delete()
  async deleteFromFriends(@InjectUser() user : User, @Query('whom') whom : string) : Promise<void> {
    return await this.friendsService.deleteFromFriends(user.id, whom);
  }
}

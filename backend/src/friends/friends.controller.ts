import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
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
  @Get()
  async getFriends(@Query('userid') userid : string, @Query('page', TryParseIntPipe) page: number) : Promise<User[]> {
    return await this.friendsService.getFriendsOf(userid);
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

import { Body, Controller, Delete, Get, Post, Query, UsePipes } from "@nestjs/common";
import { Roles } from "../../users/roles";
import { AuthAs } from "@decorators";
import { UsersService } from "./users.service";
import { AppValidationPipe, TryParseIntPipe } from "@pipes";
import { BlockUserDto } from "./dto/block-user.dto";
import { BlockedUser } from "@models";

@Controller('/admin/users')
@AuthAs(Roles.admin)
export class UsersController {
  constructor(
    private readonly usersService : UsersService
  ) {}

  @Post()
  @UsePipes(AppValidationPipe)
  async blockUser(@Query('userid') userid : string, @Body() { reason }: BlockUserDto) : Promise<void> {
    return await this.usersService.blockUser(userid, reason);
  }

  @Delete()
  async delete(@Query('userid') userid?: string, @Query('useridtodell') useridtodell?: string) : Promise<void> {
    useridtodell && await this.usersService.deleteUser(useridtodell);
    userid && await this.usersService.unBlockUser(userid);
  }

  @Get()
  async getBlockedUsers(@Query('page', TryParseIntPipe) page?: number) : Promise<BlockedUser[]> {
    return await this.usersService.getBlockedUsers(page);
  }
}

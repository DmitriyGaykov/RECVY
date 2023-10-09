import { Body, Controller, Get, Patch, Query, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@models";
import { TryParseIntPipe } from "@pipes";
import { AuthAs } from "@decorators";
import { Roles } from "./roles";
import { FormDataRequest } from "nestjs-form-data";
import { IsThisUserInterceptor } from "@interceptors";
import { NullableUser } from "./interfaces/nullable-user.interface";

@Controller('users')
@AuthAs(Roles.user)
export class UsersController {
  constructor(
    private readonly usersService : UsersService
  ) {}

  @Get()
  async getUsers(@Query('page', TryParseIntPipe) page?: number, @Query('searchText') searchText?: string) : Promise<User[]> {
    return searchText ?
      await this.usersService.searchUsers(searchText, page) :
      await this.usersService.getUsers(page);
  }

  @Patch()
  @UseInterceptors(IsThisUserInterceptor)
  @FormDataRequest()
  async editUserInfo(@Body() user : NullableUser) : Promise<User> {
    return await this.usersService.editUserInfo(user);
  }
}

import {Controller, Delete, Get, Head, Inject, Post, Query, UseInterceptors} from "@nestjs/common";
import { SubscribersService } from "./subscribers.service";
import { User } from "@models";
import { TryParseIntPipe } from "@pipes";
import { AuthAs, InjectUser } from "@decorators";
import { Roles } from "../users/roles";

@Controller('subscribers')
@AuthAs(Roles.user)
export class SubscribersController {
  constructor(
    private readonly subscribersService : SubscribersService
  ) {}

  @Head()
  async isSubscribingExist(@Query('userid') userid: string, @Query('whom') whom: string) : Promise<void> {
    return await this.subscribersService.isSubscribingExist(userid, whom);
  }

  @Get()
  async getSubscribersOf(@Query('userid') userid : string, @Query('page', TryParseIntPipe) page?: number, @Query('searchText') searchText?: string) : Promise<User[]> {
    return await this.subscribersService.getSubscribersOf(userid, page, searchText);
  }

  @Post()
  async subscribe(@InjectUser() user : User, @Query('subTo') subTo : string) : Promise<void> {
    return await this.subscribersService.subscribe(user.id, subTo);
  }

  @Delete()
  async describe(@InjectUser() user : User, @Query('desOf') disOf : string) : Promise<void> {
    return await this.subscribersService.describe(user.id, disOf);
  }
}

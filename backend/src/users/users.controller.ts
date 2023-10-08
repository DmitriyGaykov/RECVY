import { Controller, Get, Inject } from "@nestjs/common";
import * as pg_promise from 'pg-promise'
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService : UsersService
  ) {}

}

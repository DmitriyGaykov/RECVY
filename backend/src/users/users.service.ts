import { Injectable } from '@nestjs/common';
import { UsersDbService } from "./users-db.service";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDbService : UsersDbService
  ) {}

  async addUser(userDto : SignUpDto) : Promise<string> {
    return this.usersDbService.addUser(userDto);
  }

  async signIn(userDto : SignInDto) : Promise<string> {
    return this.signIn(userDto);
  }
}

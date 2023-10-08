import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersDbService } from "./users-db.service";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { User } from "@models";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDbService : UsersDbService
  ) {}

  async addUser(userDto : SignUpDto) : Promise<string> {
    try {
      return await this.usersDbService.addUser(userDto);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async signIn(userDto : SignInDto) : Promise<string> {
    try {
      return await this.usersDbService.signIn(userDto);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getUserById(id: string) : Promise<User> {
    try {
      return await this.usersDbService.getUserById(id);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }
}

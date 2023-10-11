import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersDbService } from "./users-db.service";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { User } from "@models";
import { changePhotoPathFor, getSkipAndTake } from "@utils";
import { NullableUser } from "./interfaces/nullable-user.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { FilesService } from "../files/files.service";

@Injectable()
export class UsersService {
  private static readonly CNT_USER_FOR_TIME = 8;

  constructor(
    private readonly usersDbService : UsersDbService,
    private readonly exceptionManagerService : ExceptionManagerService,
    private readonly filesService : FilesService
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
      const user = await this.usersDbService.getUserById(id);
      return changePhotoPathFor(user);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getUsers(page?: number) : Promise<User[]> {
    try {
      const { skip, take } = getSkipAndTake(page, UsersService.CNT_USER_FOR_TIME);
      const users = await this.usersDbService.getUsers(skip, take);
      return users.map(user => changePhotoPathFor(user));
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async editUserInfo(user : NullableUser) : Promise<User> {
    try {
      const _user = await this.usersDbService.editUserInfo(user);
      return changePhotoPathFor(_user);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async searchUsers(text : string, page?: number) : Promise<User[]> {
    try {
      if (text.length < 1) {
        throw this.exceptionManagerService.generateFieldError('searchText', 'Поисковая строка не должна быть пустой')
      }
      const { skip, take } = getSkipAndTake(page, UsersService.CNT_USER_FOR_TIME);
      const users = await this.usersDbService.searchUsers(text, skip, take);
      return users.map(user => changePhotoPathFor(user));
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }
}

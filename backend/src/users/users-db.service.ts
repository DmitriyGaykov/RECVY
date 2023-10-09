import { Inject, Injectable } from "@nestjs/common";
import * as pg_promise from "pg-promise";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { IError } from "../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { User } from "@models";
import { NullableUser } from "./interfaces/nullable-user.interface";

@Injectable()
export class UsersDbService {
  constructor(
    @Inject('visitor-connection') private readonly vis_pgp : pg_promise.IDatabase<IDBDatabase>,
    @Inject('app-user-connection') private readonly user_pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}

  async addUser(userdto : SignUpDto) : Promise<string> {
    try {
      userdto.photo ??= null;
      const resp = await this.vis_pgp.one('select * from signUp(${login}, ${firstname}, ${lastname}, ${age}, ${password}, ${photo})', userdto);
      return resp.signup;
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
  async signIn(signInDto : SignInDto) : Promise<string> {
    try {
      const resp = await this.vis_pgp.one('select * from signIn(${login}, ${password})', signInDto);
      return resp.signin;
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
  async getUserById(id : string) : Promise<User> {
    try {
      const resp : User = await this.vis_pgp.one('select * from getUserById(${id})', {id});

      if(resp.id == null) {
        throw {message: ExceptionManagerService.generateException('id', 'Нет пользователя с таким id')}
      }

      return resp;
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
  async getUsers(skip?: number, take?: number) : Promise<User[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.user_pgp.any("select * from getUsers(${skip}, ${take})", { skip, take });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
  async editUserInfo({id, firstname, lastname, age, aboutme, password } : NullableUser) : Promise<User> {
    try {
      const params : NullableUser = {
        id: id,
        firstname: firstname || null,
        lastname: lastname || null,
        age: age || null,
        aboutme: aboutme || null,
        password: password || null
      };

      await this.user_pgp.none('call editUserInfo(${id}, ${firstname}, ${lastname}, ${password}, ${aboutme}, ${age})', params);
      return await this.getUserById(id)
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
  async searchUsers(text : string, skip?: number, take?: number) : Promise<User[]> {
    try {
      skip ??= null;
      take ??= null;

      return await this.user_pgp.any("select * from searchUser(${text}, ${skip}, ${take})", {
        text,
        skip,
        take
      });
    } catch (e : unknown) {
      const err = e as IError;
      throw this.exceptionManagerService.generateErrorFromDbTextError(err.message);
    }
  }
}

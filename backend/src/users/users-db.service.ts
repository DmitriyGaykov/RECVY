import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as pg_promise from 'pg-promise';
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { IError } from "../exception-manager/interfaces/error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { SignInDto } from "../auth/dto/sign-in.dto";

@Injectable()
export class UsersDbService {
  constructor(
    @Inject('visitor-connection') private readonly pgp : pg_promise.IDatabase<IDBDatabase>,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}

  async addUser(userdto : SignUpDto) : Promise<string> {
    try {
      userdto.photo ??= null;
      const resp = await this.pgp.one('select signUp(${login}, ${firstname}, ${lastname}, ${age}, ${password}, ${photo})', userdto);
      return resp?.signup;
    } catch (e : unknown) {
      const err = e as IError;
      throw new BadRequestException(this.exceptionManagerService.generateErrorFromDbTextError(err.message));
    }
  }

  async signIn(signInDto : SignInDto) : Promise<string> {
    try {
      const resp = await this.pgp.one('select signIn(${login}, ${password})', signInDto);
      return resp?.signin;
    } catch (e : unknown) {
      const err = e as IError;
      throw new BadRequestException(this.exceptionManagerService.generateErrorFromDbTextError(err.message));
    }
  }
}

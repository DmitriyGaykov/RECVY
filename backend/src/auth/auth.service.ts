import {BadRequestException, Injectable} from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MemoryStoredFile } from "nestjs-form-data";
import { FilesService } from "../files/files.service";
import { generateString } from "@utils";
import { SignInDto } from "./dto/sign-in.dto";
import {ExceptionManagerService} from "../exception-manager/exception-manager.service";

export type Token = string

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService,
    private readonly filesService : FilesService,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async signUp(signUpDto : SignUpDto, file : MemoryStoredFile) : Promise<Token> {
    if(file) {
      try {
        const newFileName = await generateString(250, true);
        this.filesService.rename(file, newFileName);
        signUpDto.photo = file.originalName;
      } catch {
        throw new BadRequestException(this.exceptionManagerService.generateFieldError('photo', 'Ошибка в формате фотографии'));
      }
    }

    const id : string = await this.usersService.addUser(signUpDto);

    if(file) {
      await this.filesService.saveUserFile(file);
    }

    return await this.jwtService.signAsync({ id });
  }
  async signIn(signInDto : SignInDto) : Promise<Token> {
    const id  = await this.usersService.signIn(signInDto);
    return await this.jwtService.signAsync({id});
  }
}

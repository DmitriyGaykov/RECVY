import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { UsersService } from "../users/users.service";
import { JwtOptionsFactory, JwtService } from "@nestjs/jwt";
import { MemoryStoredFile } from "nestjs-form-data";
import { FilesService } from "../files/files.service";
import { generateString } from "@utils";
import { SignInDto } from "./dto/sign-in.dto";
import { PhotosService } from "../photos/photos.service";

export type Token = string

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService,
    private readonly filesService : FilesService
  ) {}
  async signUp(signUpDto : SignUpDto, file : MemoryStoredFile) : Promise<Token> {
    if(file) {
      const newFileName = await generateString(250, true);
      this.filesService.rename(file, newFileName);
      signUpDto.photo = file.originalName;
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

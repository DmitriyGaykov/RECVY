import { Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MemoryStoredFile } from "nestjs-form-data";
import { FilesService } from "../files/files.service";
import { generateString } from "@utils";

export type Token = string

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService,
    private readonly filesService : FilesService
  ) {}
  async signUp(signUpDto : SignUpDto, file : MemoryStoredFile) : Promise<Token> {
    try {
      if(file) {
        const newFileName = await generateString(250, true);
        this.filesService.rename(file, newFileName);
        signUpDto.photo = file.originalName;
      }

      const id : string = await this.usersService.addUser(signUpDto);

      if(file) {
        await this.filesService.saveUserFile(file);
      }

      return this.jwtService.signAsync({ id });
    } catch (e : unknown) {
      console.log(e)
      throw e;
    }
  }
}

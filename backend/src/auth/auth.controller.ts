import { BadRequestException, Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { FormDataRequest } from "nestjs-form-data";
import { AuthService, Token } from "./auth.service";
import { InjectUser, UploadFile } from "@decorators";
import { AppValidationPipe } from "@pipes";
import { SignInDto } from "./dto/sign-in.dto";
import { User } from "@models";
import { AuthGuard } from "@guards";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService : AuthService
  ) {}

  @Post('reg')
  @UsePipes(AppValidationPipe)
  @FormDataRequest()
  async signUp(@Body() signUpDto : SignUpDto, @UploadFile('photo') photo) : Promise<Token> {
      return await this.authService.signUp(signUpDto, photo);
  }

  @Post('login')
  @UsePipes(AppValidationPipe)
  @FormDataRequest()
  async signIn(@Body() signInBody : SignInDto) : Promise<Token> {
    return await this.authService.signIn(signInBody);
  }

  @Post('token-login')
  @UseGuards(AuthGuard)
  async signInWithToken(@InjectUser() user : User) : Promise<User> {
    if(!user)
      throw new BadRequestException();

    return user;
  }
}

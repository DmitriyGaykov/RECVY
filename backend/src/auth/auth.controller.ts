import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { FormDataRequest } from "nestjs-form-data";
import { AuthService, Token } from "./auth.service";
import { UploadFile } from "@decorators";
import { AppValidationPipe } from "@pipes";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService : AuthService
  ) {}

  @Post('reg')
  @UsePipes(AppValidationPipe)
  @FormDataRequest()
  async signUp(@Body() signUpDto : SignUpDto, @UploadFile('photo') photo) : Promise<Token> {
    try {
      return await this.authService.signUp(signUpDto, photo);
    } catch (e : unknown) {
      throw e;
    }
  }
}

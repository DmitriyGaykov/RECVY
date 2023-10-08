import { IsNotEmpty, IsString } from "class-validator";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";

export class SignInDto {
  @IsNotEmpty({ message: ExceptionManagerService.generateException('login', 'Заполните поле логин') })
  @IsString({ message:  ExceptionManagerService.generateException('login', 'Поле логин должно быть строковым значением')})
  login: string;

  @IsNotEmpty({ message: ExceptionManagerService.generateException('password', 'Заполните поле пароль') })
  @IsString({ message:  ExceptionManagerService.generateException('password', 'Поле пароль должно быть строковым значением')})
  password: string;
}
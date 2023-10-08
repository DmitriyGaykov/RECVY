import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";

export class SignUpDto {
  @IsNotEmpty({ message: ExceptionManagerService.generateException('login', 'Заполните поле логин') })
  @IsString({ message:  ExceptionManagerService.generateException('login', 'Поле логин должно быть строковым значением')})
  login: string;

  @IsNotEmpty({ message: ExceptionManagerService.generateException('firstname', 'Заполните поле имя') })
  @IsString({ message:  ExceptionManagerService.generateException('firstname', 'Поле имя должно быть строковым значением')})
  firstname: string;

  @IsNotEmpty({ message: ExceptionManagerService.generateException('lastname', 'Заполните поле фамилия') })
  @IsString({ message:  ExceptionManagerService.generateException('lastname', 'Поле фамилия должно быть строковым значением')})
  lastname: string;

  @IsNotEmpty({ message: ExceptionManagerService.generateException('age', 'Заполните поле возраст') })
  @IsNumber({} ,{ message:  ExceptionManagerService.generateException('age', 'Поле возраст должно быть числовым значением')})
  age: number;

  @IsNotEmpty({ message: ExceptionManagerService.generateException('password', 'Заполните поле пароль') })
  @IsString({ message:  ExceptionManagerService.generateException('password', 'Поле пароль должно быть строковым значением')})
  password: string;

  @IsOptional()
  @IsString({ message:  ExceptionManagerService.generateException('photo', 'Поле фото должно быть строковым значением')})
  photo?: string;
}
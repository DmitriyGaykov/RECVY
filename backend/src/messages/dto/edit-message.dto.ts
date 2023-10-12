import { IsNotEmpty, IsString } from "class-validator";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";

export class EditMessageDto {
  @IsString({ message: ExceptionManagerService.generateException('message', 'Сообщение должно быть строкой') })
  @IsNotEmpty({ message: ExceptionManagerService.generateException('message', 'Сообщение не должно быть пустым') })
  message: string;
}
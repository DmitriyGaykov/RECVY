import { IsNotEmpty } from "class-validator";
import { ExceptionManagerService } from "../../../exception-manager/exception-manager.service";

export class BlockUserDto {
  @IsNotEmpty({ message: ExceptionManagerService.generateException('reason', 'Предоставьте причину блокировки аккаунта') })
  reason: string;
}
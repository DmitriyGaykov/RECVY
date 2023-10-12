import { MessageType } from "@models";
import { IsNotEmpty, IsString } from "class-validator";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { IsMessageType } from "@decorators";

export class SendMessageDto {
    @IsString({ message:  ExceptionManagerService.generateException('iduserto', 'Некорректный ID получателя')})
    @IsNotEmpty({ message:  ExceptionManagerService.generateException('iduserto', 'ID получателя не должен быть пустым')})
    iduserto: string;

    @IsString({ message:  ExceptionManagerService.generateException('iduserfrom', 'Некорректный ID отправителя')})
    @IsNotEmpty({ message:  ExceptionManagerService.generateException('iduserfrom', 'ID отправителя не должен быть пустым')})
    iduserfrom: string;

    @IsString({ message:  ExceptionManagerService.generateException('message', 'Некорректное сообщение')})
    @IsNotEmpty({ message:  ExceptionManagerService.generateException('message', 'Сообщение не должно быть пустым')})
    message: string;

    @IsMessageType({ message:  ExceptionManagerService.generateException('messagetype', 'Некорректный тип сообщения') })
    messagetype: MessageType;
}
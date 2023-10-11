import { MessageType } from "@models";
import { IsString } from "class-validator";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { IsMessageType } from "@decorators";

export class SendMessageDto {
    @IsString({ message:  ExceptionManagerService.generateException('iduserto', 'Некорректный ID получателя')})
    iduserto: string;

    @IsString({ message:  ExceptionManagerService.generateException('iduserfrom', 'Некорректный ID отправителя')})
    iduserfrom: string;

    @IsString({ message:  ExceptionManagerService.generateException('message', 'Некорректное сообщение')})
    message: string;

    @IsMessageType({ message:  ExceptionManagerService.generateException('messagetype', 'Некорректный тип сообщения') })
    messagetype: MessageType;
}
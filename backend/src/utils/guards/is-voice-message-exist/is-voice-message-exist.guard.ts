import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotAcceptableException
} from '@nestjs/common';
import {MessagesDbService} from "../../../messages/messages-db.service";
import {User} from "@models";

@Injectable()
export class IsVoiceMessageExistGuard implements CanActivate {
  constructor(
    private readonly messagesDbService: MessagesDbService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const { messageid } = request.query;

    if(!messageid)
      throw new BadRequestException();

    try {
      const message = await this.messagesDbService.getMessageById(messageid);
      if(!message)
        throw new BadRequestException();

      if(message.iduserto !== user.id && message.iduserfrom !== user.id)
        throw new NotAcceptableException();
    } catch(e: unknown) {
      throw e instanceof HttpException ? e : new BadRequestException();
    }

    return true;
  }
}

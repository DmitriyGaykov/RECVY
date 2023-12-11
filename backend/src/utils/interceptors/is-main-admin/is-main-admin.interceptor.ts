import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Message} from "@models";

@Injectable()
export class IsMainAdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { iduserto } = req.body as Message;

    if(iduserto === '0')
      throw new NotAcceptableException();

    return next.handle();
  }
}

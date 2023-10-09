import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from 'rxjs';
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";

@Injectable()
export class IsThisUserInterceptor implements NestInterceptor {
  constructor(
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.body;

    if(!id || id !== req['user'].id) {
      throw new BadRequestException(this.exceptionManagerService.generateNotAuthError());
    }

    return next.handle();
  }
}

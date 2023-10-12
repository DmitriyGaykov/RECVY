import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { MessagesDbService } from "../../messages/messages-db.service";

@Injectable()
export class IsSuitDataToDellOrEditMsgGuard implements CanActivate {
  constructor(
    private readonly messageDbService: MessagesDbService
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const { messageid } = request.query;

      if(messageid == null)
        throw new BadRequestException();

      if(messageid) {
        const msg = await this.messageDbService.getMessageById(messageid);

        if(!msg || msg.iduserfrom !== request.user.id) {
          throw new BadRequestException();
        }
      }

      return true;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}

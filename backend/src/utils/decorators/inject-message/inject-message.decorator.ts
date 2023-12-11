import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {Message} from "@models";

export const InjectMessage = createParamDecorator((data: string, ctx: ExecutionContext) : Message => {
  return ctx.switchToHttp().getRequest().msg;
})

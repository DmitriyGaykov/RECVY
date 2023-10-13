import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@models";

export const InjectUser = createParamDecorator((data: string, ctx: ExecutionContext) : User => {
  return ctx.switchToHttp().getRequest().user;
})

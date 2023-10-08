import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";

export const InjectCookie = createParamDecorator((data : string, ctx : ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.cookies[data];
});

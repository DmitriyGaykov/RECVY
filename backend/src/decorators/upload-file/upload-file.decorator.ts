import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { MemoryStoredFile } from "nestjs-form-data";

export const UploadFile = createParamDecorator((data : string, ctx : ExecutionContext) : MemoryStoredFile => {
  const req = ctx.switchToHttp().getRequest();
  const file : MemoryStoredFile = req.body[data];

  if(!file)
    return null;

  req.body[data] = file.originalName;

  return file;
})
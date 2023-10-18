import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IsFile, MemoryStoredFile } from "nestjs-form-data";

export const UploadFile = createParamDecorator((data : string, ctx : ExecutionContext) : MemoryStoredFile => {
  const req = ctx.switchToHttp().getRequest();
  const file : MemoryStoredFile = req.body[data];

  if(!file)
    return null;

  if(!(file instanceof MemoryStoredFile)) {
    throw new BadRequestException({
      'photo': 'Поле файл не действительно'
    });
  }

  req.body[data] = file?.originalName;

  return file;
})
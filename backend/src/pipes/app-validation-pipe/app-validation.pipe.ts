import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe
} from "@nestjs/common";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super();
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      value.age = Number(value.age)
      return await super.transform(value, metadata);
    } catch (e : unknown) {
      const err = e as BadRequestException;
      const exc = new ExceptionManagerService().generateErrorFromDbTextError(ExceptionManagerService.unionExceptions(err['response']['message']));
      throw new BadRequestException(exc);
    }
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe, ValidationPipeOptions
} from "@nestjs/common";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { SignUpDto } from "../../auth/dto/sign-up.dto";

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if(value) {
        value.age = Number(value.age?.toString()) || -1;
      }
      return await super.transform(value, metadata);
    } catch (e : unknown) {
      const err = e as BadRequestException;
      const exc = new ExceptionManagerService().generateErrorFromDbTextError(ExceptionManagerService.unionExceptions(err['response']['message']));
      throw new BadRequestException(exc);
    }
  }
}

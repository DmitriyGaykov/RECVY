import { Module } from '@nestjs/common';
import { ExceptionManagerService } from './exception-manager.service';

@Module({
  providers: [ExceptionManagerService],
  exports: [ExceptionManagerService]
})
export class ExceptionManagerModule {}

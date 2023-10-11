import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { SubscribersDbService } from './subscribers-db.service';
import { DbModule } from "../db/db.module";
import { ExceptionManagerModule } from "../exception-manager/exception-manager.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { UsersModule } from "../users/users.module";
import { AppJwtModule } from "../auth/jwt/jwt.module";

@Module({
  imports: [DbModule.register('app-user'), ExceptionManagerModule, UsersModule, AppJwtModule],
  providers: [SubscribersService, SubscribersDbService, ExceptionManagerService],
  controllers: [SubscribersController]
})
export class SubscribersModule {}

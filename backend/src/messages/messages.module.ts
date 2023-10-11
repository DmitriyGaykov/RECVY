import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesDbService } from './messages-db.service';
import { DbModule } from "../db/db.module";
import { UsersModule } from "../users/users.module";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

@Module({
  imports: [DbModule.register('app-user'), UsersModule, AppJwtModule],
  providers: [
    MessagesService,
    MessagesDbService,
    ExceptionManagerService
  ],
  controllers: [MessagesController]
})
export class MessagesModule {}

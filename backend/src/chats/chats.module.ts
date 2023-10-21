import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsDbService } from './chats-db.service';
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { UsersModule } from "../users/users.module";
import { DbModule } from "../db/db.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { FilesService } from "../files/files.service";

@Module({
  imports: [AppJwtModule, UsersModule, DbModule.register('app-user')],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsDbService, ExceptionManagerService, FilesService]
})
export class ChatsModule {}

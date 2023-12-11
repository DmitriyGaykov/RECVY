import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesDbService } from './messages-db.service';
import { DbModule } from "../db/db.module";
import { UsersModule } from "../users/users.module";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { StickersService } from "../admin/stickers/stickers.service";
import { StickersModule } from "../admin/stickers/stickers.module";
import { AudiosModule } from './audios/audios.module';
import {AudiosService} from "./audios/audios.service";

@Module({
  imports: [DbModule.register('app-user'), UsersModule, AppJwtModule, StickersModule, AudiosModule],
  providers: [
    MessagesService,
    MessagesDbService,
    ExceptionManagerService,
    StickersService,
    AudiosService
  ],
  controllers: [MessagesController],
  exports: [MessagesDbService]
})
export class MessagesModule {}

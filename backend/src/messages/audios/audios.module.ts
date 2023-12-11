import { Module } from '@nestjs/common';
import { AudiosController } from './audios.controller';
import { AudiosService } from './audios.service';
import {UsersModule} from "../../users/users.module";
import {AppJwtModule} from "../../auth/jwt/jwt.module";
import {ExceptionManagerModule} from "../../exception-manager/exception-manager.module";
import {FilesService} from "../../files/files.service";
import {MessagesDbService} from "../messages-db.service";
import {DbModule} from "../../db/db.module";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
  imports: [DbModule.register('app-user'), ExceptionManagerModule, UsersModule, AppJwtModule, NestjsFormDataModule],
  providers: [AudiosService, FilesService, MessagesDbService, MessagesDbService],
  controllers: [AudiosController],
  exports: [AudiosService]
})
export class AudiosModule {}

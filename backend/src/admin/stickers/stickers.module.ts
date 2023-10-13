import { Module } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { StickersController } from './stickers.controller';
import { StickersDbService } from './stickers-db.service';
import { UsersModule } from "../../users/users.module";
import { AppJwtModule } from "../../auth/jwt/jwt.module";
import { DbModule } from "../../db/db.module";
import { FilesService } from "../../files/files.service";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [UsersModule, AppJwtModule, DbModule.register('app-admin'), NestjsFormDataModule],
  providers: [StickersService, StickersDbService, FilesService, ExceptionManagerService],
  controllers: [StickersController],
  exports: [StickersService, StickersDbService, FilesService]
})
export class StickersModule {}

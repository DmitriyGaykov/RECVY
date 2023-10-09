import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { DbModule } from "../db/db.module";
import { FilesService } from "../files/files.service";
import { PhotosDbService } from "./photos-db.service";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [DbModule.register('app-user'), AppJwtModule, NestjsFormDataModule, UsersModule],
  providers: [PhotosService, FilesService, PhotosDbService, ExceptionManagerService, UsersService],
  controllers: [PhotosController],
  exports: [PhotosService]
})
export class PhotosModule {}

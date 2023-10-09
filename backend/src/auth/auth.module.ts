import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { FilesService } from "../files/files.service";
import { AppJwtModule } from "./jwt/jwt.module";
import { PhotosService } from "../photos/photos.service";
import { PhotosDbService } from "../photos/photos-db.service";
import { PhotosModule } from "../photos/photos.module";

@Module({
  imports: [
    AppJwtModule,
    UsersModule,
    NestjsFormDataModule
  ],
  providers: [AuthService, FilesService],
  controllers: [AuthController],
  exports: [AppJwtModule]
})
export class AuthModule {}

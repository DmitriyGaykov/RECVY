import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { FilesService } from "../files/files.service";
import { AppJwtModule } from "./jwt/jwt.module";
import {ExceptionManagerService} from "../exception-manager/exception-manager.service";

@Module({
  imports: [
    AppJwtModule,
    UsersModule,
    NestjsFormDataModule
  ],
  providers: [AuthService, FilesService, ExceptionManagerService],
  controllers: [AuthController],
  exports: [AppJwtModule]
})
export class AuthModule {}

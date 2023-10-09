import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDbService } from './users-db.service';
import { DbModule } from "../db/db.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { FilesService } from "../files/files.service";

@Module({
  imports: [DbModule.register('visitor'), DbModule.register('app-user'), AppJwtModule, NestjsFormDataModule],
  controllers: [UsersController],
  providers: [UsersService, UsersDbService, ExceptionManagerService, FilesService],
  exports: [UsersService, UsersDbService]
})
export class UsersModule {}

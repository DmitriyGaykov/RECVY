import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDbService } from './users-db.service';
import { DbModule } from "../db/db.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { JwtService } from "@nestjs/jwt";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [DbModule.register('visitor'), DbModule.register('app-user'), AppJwtModule, NestjsFormDataModule],
  controllers: [UsersController],
  providers: [UsersService, UsersDbService, ExceptionManagerService],
  exports: [UsersService]
})
export class UsersModule {}

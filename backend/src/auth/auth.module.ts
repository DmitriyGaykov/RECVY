import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { FilesService } from "../files/files.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "Hello mir, manera crutit mir",
      signOptions: {
        expiresIn: '7d'
      }}),
    UsersModule,
    NestjsFormDataModule
  ],
  providers: [AuthService, FilesService],
  controllers: [AuthController]
})
export class AuthModule {}

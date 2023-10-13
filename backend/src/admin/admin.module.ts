import {  Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { StickersModule } from './stickers/stickers.module';
import { StickersService } from "./stickers/stickers.service";

@Module({
  imports: [UsersModule, StickersModule],
  exports: [StickersModule]
})
export class AdminModule {}

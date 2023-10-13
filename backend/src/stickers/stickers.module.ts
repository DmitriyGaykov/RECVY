import { Module } from '@nestjs/common';
import { StickersController } from './stickers.controller';
import { StickersService } from './stickers.service';
import { StickersDbService } from './stickers-db.service';
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { UsersModule } from "../users/users.module";
import { AppJwtModule } from "../auth/jwt/jwt.module";
import { DbModule } from "../db/db.module";

@Module({
  imports: [UsersModule, AppJwtModule, DbModule.register('app-user')],
  controllers: [StickersController],
  providers: [StickersService, StickersDbService, ExceptionManagerService],
  exports: [StickersService]
})
export class StickersModule {}

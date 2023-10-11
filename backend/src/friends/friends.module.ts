import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsDbService } from './friends-db.service';
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { DbModule } from "../db/db.module";
import { UsersModule } from "../users/users.module";
import { AppJwtModule } from "../auth/jwt/jwt.module";

@Module({
  imports: [DbModule.register('app-user'), UsersModule, AppJwtModule],
  providers: [FriendsService, FriendsDbService, ExceptionManagerService],
  controllers: [FriendsController]
})
export class FriendsModule {}

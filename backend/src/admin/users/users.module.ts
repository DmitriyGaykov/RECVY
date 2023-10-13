import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppJwtModule } from "../../auth/jwt/jwt.module";
import { UsersModule as _UsersModule } from "../../users/users.module";
import { UsersDbService } from './users-db.service';
import { DbModule } from "../../db/db.module";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { FilesModule } from "../../files/files.module";
import { FilesService } from "../../files/files.service";

@Module({
  imports: [AppJwtModule, _UsersModule, DbModule.register('app-admin'), FilesModule],
  providers: [UsersService, UsersDbService, ExceptionManagerService, FilesService],
  controllers: [UsersController]
})
export class UsersModule {}

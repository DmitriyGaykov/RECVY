import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExceptionManagerModule } from './exception-manager/exception-manager.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PhotosModule } from "./photos/photos.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ExceptionManagerModule,
    FilesModule,
    PhotosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExceptionManagerModule } from './exception-manager/exception-manager.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PhotosModule } from "./photos/photos.module";
import { SubscribersModule } from './subscribers/subscribers.module';
import { FriendsModule } from './friends/friends.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ExceptionManagerModule,
    FilesModule,
    PhotosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    SubscribersModule,
    FriendsModule,
    MessagesModule
  ],
})
export class AppModule {}

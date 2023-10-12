import { DynamicModule, InternalServerErrorException, Module, Provider } from "@nestjs/common";
import * as pg_promise from 'pg-promise'
import { ConfigService } from "../config/config.service";

@Module({})
export class DbModule {
  static register(username: string): DynamicModule {
    const pgp = pg_promise();
    const createProvider = (username : string): Provider => {
      return {
        provide: username + '-connection', // Указываем имя провайдера как connectionName
        useFactory: async (configService: ConfigService) => {
          const options = {
            host: configService.get('HOST'),
            port: parseInt(configService.get('PORT')),
            database: configService.get('DATABASE'),
          };

          username =  username.replaceAll('-', '_');

          const connection = {
            ...options,
            user: username,
            password: configService.get(username.toUpperCase())
          };
          return pgp(connection);
        },
        inject: [ConfigService],
      };
    }

    let pgPromiseProvider: Provider;

    switch (username) {
      case 'visitor': case 'app-user': case 'app-admin':
        pgPromiseProvider = createProvider(username);
        break;
      default:
        throw new InternalServerErrorException();
    }

    return {
      module: DbModule,
      providers: [pgPromiseProvider, ConfigService],
      exports: [pgPromiseProvider],
    };
  }
}

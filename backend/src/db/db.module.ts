import { DynamicModule, InternalServerErrorException, Module, Provider } from "@nestjs/common";
import * as pg_promise from 'pg-promise'


@Module({
})
export class DbModule {
  static register(username: string) : DynamicModule {
    const pgp = pg_promise();
    const options = {
      host: 'localhost',
      port: 5432,
      database: 'recvy',
    };

    let pgPromiseProvider : Provider;

    switch (username) {
      case 'visitor':
        pgPromiseProvider = {
          provide: 'visitor-connection', // Указываем имя провайдера как connectionName
          useFactory: async () => {
            const connection = {
              ...options,
              user: username,
              password: '123123123'
            };
            return pgp(connection);;
          },
        };
        break;
      case 'app-user':
        pgPromiseProvider = {
          provide: 'app-user-connection', // Указываем имя провайдера как connectionName
          useFactory: () => {
            const connection = {
              ...options,
              user: 'app_user',
              password: '123123123'
            };
            return pgp(connection);
          },
        };
        break;
      default:
        throw new InternalServerErrorException();
    }

    return {
      module: DbModule,
      providers: [pgPromiseProvider],
      exports: [pgPromiseProvider],
    }
  }
}

import { Provider } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import * as pg_promise from "pg-promise";

export const createProvider = (username : string): Provider => {
  const pgp = pg_promise();

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
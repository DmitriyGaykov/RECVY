import { DynamicModule, InternalServerErrorException, Module, Provider } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { createProvider, memo } from "../utils/scripts";

@Module({})
export class DbModule {
  private static memoCreateProvider = memo(createProvider);

  static register(username: string): DynamicModule {
    let pgPromiseProvider: Provider;

    switch (username) {
      case 'visitor': case 'app-user': case 'app-admin':
        pgPromiseProvider = DbModule.memoCreateProvider(username);
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

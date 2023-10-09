import { JwtModule } from "@nestjs/jwt";
import { DynamicModule } from "@nestjs/common";

export const AppJwtModule : DynamicModule = JwtModule.register({
  secret: "Hello mir, manera crutit mir",
  signOptions: {
    expiresIn: '7d'
  }})
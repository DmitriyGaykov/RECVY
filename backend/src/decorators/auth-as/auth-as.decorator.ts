import { applyDecorators, CanActivate, SetMetadata, Type, UseGuards } from "@nestjs/common";
import { Roles } from "../../users/roles";
import { AuthGuard } from "@guards";

export const AuthAs = (role : Roles, guards: Type<CanActivate>[] | CanActivate[] = []) => applyDecorators(
  SetMetadata('auth-as', role),
  UseGuards(AuthGuard, ...guards)
);

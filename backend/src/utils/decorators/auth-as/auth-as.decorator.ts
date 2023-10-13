import { applyDecorators, CanActivate, Controller, SetMetadata, Type, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@guards";
import { Roles } from "../../../users/roles";

export const AuthAs = (role : Roles, guards: Type<CanActivate>[] | CanActivate[] = []) => applyDecorators(
  SetMetadata('auth-as', role),
  UseGuards(AuthGuard, ...guards)
);

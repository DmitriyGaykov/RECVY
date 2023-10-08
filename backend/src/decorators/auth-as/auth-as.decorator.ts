import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Roles } from "../../users/roles";
import { AuthGuard } from "@guards";

export const AuthAs = (role : Roles) => applyDecorators(
  SetMetadata('auth-as', role),
  UseGuards(AuthGuard)
);

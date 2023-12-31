import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../../../users/users.service";
import { Roles } from "../../../users/roles";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,
    private readonly usersService : UsersService,
    private readonly reflector : Reflector
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwt = req.cookies['jwt_recvy'];

    const role = this.reflector.get<Roles>('auth-as', context.getHandler()) ||
                 Reflect.getMetadata('auth-as', context.getClass())

    if(!jwt)
      throw new BadRequestException();

    let id: string;

    try {
      const obj = await this.jwtService.verifyAsync(jwt);
      id = obj.id;
    } catch {
      throw new BadRequestException();
    }

    if(!id)
      throw new BadRequestException()

    const user = await this.usersService.getUserById(id)

    req['user'] = user;

    if(!role || user.role.includes(role))
      return true;

    throw new ForbiddenException({ error: 'В доступе отказано!' })
  }
}

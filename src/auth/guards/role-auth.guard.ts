import { Injectable, CanActivate, ExecutionContext, UnauthorizedException,  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorator/roles.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }

    // Verificar y cargar roles si no están presentes
    if (!user.role || !user.role.role) {
      const userEntity = await this.userService.findOne(user.username);
      user.role = userEntity.role;
    }

    return requiredRoles.includes(user.role.role);
  }
}

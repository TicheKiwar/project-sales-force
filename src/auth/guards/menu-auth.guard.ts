import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TMenu } from 'src/common/TYPES/menu.enum';
import { RoleWithMenuAndPermissions } from '../domain/RoleWithMenu-interface';
import { AuthService } from '../application/auth.service';
import { MENU_KEY } from 'src/common/decorator/menu.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class MenuGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService:UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredMenu = this.reflector.getAllAndOverride<TMenu>(MENU_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredMenu) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    const rolesWithMenusAndPermissions:RoleWithMenuAndPermissions[] = await this.authService.getRolesWithMenusAndPermissionsByUser(user.userId);
    const hasRequiredMenu = rolesWithMenusAndPermissions.some((role:RoleWithMenuAndPermissions )=> role.menu === requiredMenu);

    if (!hasRequiredMenu) {
      throw new ForbiddenException(`User does not have access to the required menu: ${requiredMenu}`);
    }

    return true;
  }
}

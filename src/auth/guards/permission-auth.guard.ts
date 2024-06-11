import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MENU_KEY } from 'src/common/decorator/menu.decorator';
import { RoleWithMenuAndPermissions } from '../domain/RoleWithMenu-interface';
import { UserService } from 'src/modules/user/user.service';
import { TPermiso } from 'src/common/TYPES/permission.enum';
import { PERMISO_KEY } from 'src/common/decorator/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService:UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermiso = this.reflector.getAllAndOverride<TPermiso>(PERMISO_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermiso) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    const rolesWithMenusAndPermissions: RoleWithMenuAndPermissions[] = await this.authService.getRolesWithMenusAndPermissionsByUser(user.userId);
    
    const requiredMenu = this.reflector.getAllAndOverride<string>(MENU_KEY, [context.getClass()]);

    const hasRequiredPermission = rolesWithMenusAndPermissions.some((role) => 
      role.menu === requiredMenu && role.permission.includes(requiredPermiso)
    );

    if (!hasRequiredPermission) {
      throw new ForbiddenException(`User does not have the required permission: ${requiredPermiso} for menu: ${requiredMenu}`);
    }

    return true;
  }
}

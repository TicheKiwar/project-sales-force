import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  
  @UseGuards(JwtAuthGuard,RolesGuard)
  getMenu(@Query('roleId') roleId: string) {
    const roleIdNumber = parseInt(roleId, 10);
    return this.menuService.getMenuForRoleId(roleIdNumber);
  }
}

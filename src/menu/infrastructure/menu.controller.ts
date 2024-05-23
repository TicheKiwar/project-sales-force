import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(@Query('roleId') roleId: string) {
    const roleIdNumber = parseInt(roleId, 10);
    return this.menuService.getMenuForRoleId(roleIdNumber);
  }
}

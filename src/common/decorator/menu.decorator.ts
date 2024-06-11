import { SetMetadata } from '@nestjs/common';
import { TMenu } from '../TYPES/menu.enum';

export const MENU_KEY = 'menu';
export const Menu = (menu: TMenu) => SetMetadata(MENU_KEY, menu);
import { SetMetadata } from '@nestjs/common';
import { TPermiso } from '../TYPES/permission.enum';

export const PERMISO_KEY = 'permiso';
export const Permission = (permiso: TPermiso) => SetMetadata(PERMISO_KEY, permiso);
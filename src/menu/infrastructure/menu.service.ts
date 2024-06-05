import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  getMenuForRoleId(roleId?: number): any[] {
    console.log(`Received roleId: ${roleId}`);

    if (roleId === 1) {
      return ["Crear productos","Modificar productos","Eliminar productos","Ver vendedores","Ver clientes"];
    } else if (roleId === 2) {
      return ["Seleccionar productos","Crear tarea","Modificar tarea","Oportunidades","Ventas"];
    } else if (roleId === 3) {
      return ["Ver reportes","Seleccionar vendedors"];
    }
    return ["defecto"];
  }
}

import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menus } from "./Menus.entity";
import { Permissions } from "./Permissions.entity";

@Index("permissions_menus_pkey", ["permissionsMenusId"], { unique: true })
@Entity("permissions_menus", { schema: "public" })
export class PermissionsMenus {
  @PrimaryGeneratedColumn({ type: "integer", name: "permissions_menus_id" })
  permissionsMenusId: number;

  @ManyToOne(() => Menus, (menus) => menus.permissionsMenus)
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: Menus;

  @ManyToOne(() => Permissions, (permissions) => permissions.permissionsMenus)
  @JoinColumn([{ name: "permission_id", referencedColumnName: "permissionId" }])
  permission: Permissions;
}

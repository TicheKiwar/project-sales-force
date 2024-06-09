import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./Permissions.entity";
import { MenusRoles } from "./MenusRoles.entity";

@Index("permissions_menus_pkey", ["permissionsMenusId"], { unique: true })
@Entity("permissions_menus", { schema: "public" })
export class PermissionsMenus {
  @PrimaryGeneratedColumn({ type: "integer", name: "permissions_menus_id" })
  permissionsMenusId: number;

  @ManyToOne(() => Permissions, (permissions) => permissions.permissionsMenus)
  @JoinColumn([{ name: "permission_id", referencedColumnName: "permissionId" }])
  permission: Permissions;

  @ManyToOne(() => MenusRoles, (menusRoles) => menusRoles.permissionsMenus)
  @JoinColumn([
    { name: "menus_roles_id", referencedColumnName: "rolePermissionId" },
  ])
  menusRoles: MenusRoles;
}

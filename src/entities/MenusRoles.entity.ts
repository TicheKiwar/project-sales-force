import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menus } from "./Menus.entity";
import { Roles } from "./Roles.entity";
import { PermissionsMenus } from "./PermissionsMenus.entity";

@Index("role_permission_pkey", ["rolePermissionId"], { unique: true })
@Entity("menus_roles", { schema: "public" })
export class MenusRoles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_permission_id" })
  rolePermissionId: number;

  @ManyToOne(() => Menus, (menus) => menus.menusRoles)
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: Menus;

  @ManyToOne(() => Roles, (roles) => roles.menusRoles)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;

  @OneToMany(
    () => PermissionsMenus,
    (permissionsMenus) => permissionsMenus.menusRoles
  )
  permissionsMenus: PermissionsMenus[];
}

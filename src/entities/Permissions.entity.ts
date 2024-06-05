import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionsMenus } from "./PermissionsMenus.entity";

@Index("permissions_pkey1", ["permissionId"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "permission_id" })
  permissionId: number;

  @Column("character varying", {
    name: "permission",
    nullable: true,
    length: 50,
  })
  permission: string | null;

  @OneToMany(
    () => PermissionsMenus,
    (permissionsMenus) => permissionsMenus.permission
  )
  permissionsMenus: PermissionsMenus[];
}

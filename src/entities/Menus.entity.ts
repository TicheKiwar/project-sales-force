import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenusRoles } from "./MenusRoles.entity";

@Index("permissions_pkey", ["menuId"], { unique: true })
@Entity("menus", { schema: "public" })
export class Menus {
  @PrimaryGeneratedColumn({ type: "integer", name: "menu_id" })
  menuId: number;

  @Column("character varying", { name: "menu", nullable: true, length: 50 })
  menu: string | null;

  @OneToMany(() => MenusRoles, (menusRoles) => menusRoles.menu)
  menusRoles: MenusRoles[];
}

import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";

//@Index("roles_pkey", ["roleId"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("enum", {
    name: "role",
    enum: ["administrador", "vendedor", "supervisor"],
  })
  role: "administrador" | "vendedor" | "supervisor";

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}

import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles.entity";
import { Users } from "./Users.entity";

@Index("roles_user_pkey", ["rolesUserId"], { unique: true })
@Entity("roles_users", { schema: "public" })
export class RolesUsers {
  @PrimaryGeneratedColumn({ type: "integer", name: "roles_user_id" })
  rolesUserId: number;

  @ManyToOne(() => Roles, (roles) => roles.rolesUsers)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.rolesUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}

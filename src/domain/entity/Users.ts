import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Roles } from "./Roles";

@Index("users_pkey", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "username", length: 50 })
  username: string;

  @Column("character varying", { name: "password", length: 100 })
  password: string;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("timestamp without time zone", { name: "register_date" })
  registerDate: Date;

  @Column("boolean", {
    name: "deleted_status",
    nullable: true,
    default: () => "false",
  })
  deletedStatus: boolean | null;

  @OneToMany(() => Orders, (orders) => orders.employee)
  orders: Orders[];

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role", referencedColumnName: "roleId" }])
  role: Roles;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders.entity";
import { Persons } from "./Persons.entity";
import { Roles } from "./Roles.entity";

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

  @ManyToOne(() => Persons, (persons) => persons.users)
  @JoinColumn([{ name: "person_id", referencedColumnName: "personId" }])
  person: Persons;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role", referencedColumnName: "roleId" }])
  role: Roles;
}

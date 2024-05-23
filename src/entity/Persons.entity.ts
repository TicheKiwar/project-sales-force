import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "./Customers.entity";
import { Users } from "./Users.entity";

//@Index("persons_pkey", ["personId"], { unique: true })
@Entity("persons", { schema: "public" })
export class Persons {
  @PrimaryGeneratedColumn({ type: "integer", name: "person_id" })
  personId: number;

  @Column("character", { name: "cedula", length: 10 })
  cedula: string;

  @Column("character varying", { name: "first_name", length: 25 })
  firstName: string;

  @Column("character varying", {
    name: "middle_name",
    nullable: true,
    length: 25,
  })
  middleName: string | null;

  @Column("character varying", { name: "last_name", length: 25 })
  lastName: string;

  @Column("date", { name: "birth_date" })
  birthDate: string;

  @OneToMany(() => Customers, (customers) => customers.person)
  customers: Customers[];

  @OneToMany(() => Users, (users) => users.person)
  users: Users[];
}

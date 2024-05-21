import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persons } from "./Persons";
import { Orders } from "./Orders";

@Index("customers_pkey", ["customerId"], { unique: true })
@Entity("customers", { schema: "public" })
export class Customers {
  @PrimaryGeneratedColumn({ type: "integer", name: "customer_id" })
  customerId: number;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("character varying", { name: "address", length: 100 })
  address: string;

  @Column("character", { name: "phone_number", length: 10 })
  phoneNumber: string;

  @Column("timestamp without time zone", { name: "register_date" })
  registerDate: Date;

  @Column("enum", { name: "customer_status", enum: ["prospecto", "cliente"] })
  customerStatus: "prospecto" | "cliente";

  @Column("timestamp without time zone", {
    name: "client_date",
    nullable: true,
  })
  clientDate: Date | null;

  @Column("boolean", {
    name: "deleted_status",
    nullable: true,
    default: () => "false",
  })
  deletedStatus: boolean | null;

  @ManyToOne(() => Persons, (persons) => persons.customers)
  @JoinColumn([{ name: "person_id", referencedColumnName: "personId" }])
  person: Persons;

  @OneToMany(() => Orders, (orders) => orders.client)
  orders: Orders[];
}

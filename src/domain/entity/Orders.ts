import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "./Customers";
import { Users } from "./Users";
import { OrdersDetails } from "./OrdersDetails";

@Index("orders_pkey", ["orderId"], { unique: true })
@Entity("orders", { schema: "public" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "integer", name: "order_id" })
  orderId: number;

  @Column("timestamp without time zone", { name: "order_date" })
  orderDate: Date;

  @Column("timestamp without time zone", { name: "ship_date", nullable: true })
  shipDate: Date | null;

  @Column("boolean", {
    name: "canceled_status",
    nullable: true,
    default: () => "false",
  })
  canceledStatus: boolean | null;

  @ManyToOne(() => Customers, (customers) => customers.orders)
  @JoinColumn([{ name: "client_id", referencedColumnName: "customerId" }])
  client: Customers;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: "employee_id", referencedColumnName: "userId" }])
  employee: Users;

  @OneToMany(() => OrdersDetails, (ordersDetails) => ordersDetails.order)
  ordersDetails: OrdersDetails[];
}

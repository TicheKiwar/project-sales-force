import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders.entity";
import { Products } from "./Products.entity";

@Index("orders_details_pkey", ["orderDetailId"], { unique: true })
@Entity("orders_details", { schema: "public" })
export class OrdersDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "order_detail_id" })
  orderDetailId: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", { name: "unit_price", precision: 10, scale: 2 })
  unitPrice: string;

  @ManyToOne(() => Orders, (orders) => orders.ordersDetails)
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @ManyToOne(() => Products, (products) => products.ordersDetails)
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;
}

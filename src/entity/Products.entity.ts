import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrdersDetails } from "./OrdersDetails.entity";
import { Categories } from "./Categories.entity";

//@Index("products_pkey", ["productId"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "product_id" })
  productId: number;

  @Column("character varying", { name: "product_code", length: 20 })
  productCode: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("numeric", {
    name: "unit_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitPrice: string | null;

  @Column("integer", { name: "stock", nullable: true, default: () => "0" })
  stock: number | null;

  @Column("character varying", { name: "brand", nullable: true, length: 20 })
  brand: string | null;

  @Column("timestamp without time zone", { name: "register_date" })
  registerDate: Date;

  @Column("boolean", {
    name: "deleted_status",
    nullable: true,
    default: () => "false",
  })
  deletedStatus: boolean | null;

  @OneToMany(() => OrdersDetails, (ordersDetails) => ordersDetails.product)
  ordersDetails: OrdersDetails[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;
}

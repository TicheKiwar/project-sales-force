import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products.entity";

//@Index("categories_pkey", ["categoryId"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "integer", name: "category_id" })
  categoryId: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}

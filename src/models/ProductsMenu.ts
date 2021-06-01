import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Menu from "../models/Menu";

@Entity("products_menu")
class ProductsMenu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.products_menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @Column()
  name_product: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  category_product: string;

  @Column()
  sunday: boolean;

  @Column()
  monday: boolean;

  @Column()
  tuesday: boolean;

  @Column()
  wednesday: boolean;

  @Column()
  thursday: boolean;

  @Column()
  friday: boolean;

  @Column()
  saturday: boolean;

  @Column("boolean")
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductsMenu;
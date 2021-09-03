import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Expose } from "class-transformer";

import Menu from "../models/Menu";
import CategoryProductsMenus from "./CategoryProductsMenus";

@Entity("products_menu")
class ProductsMenu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.products_menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @ManyToOne(
    () => CategoryProductsMenus,
    (category_products_menus) => category_products_menus.products_menu
  )
  @JoinColumn({ name: "category_products_menus_id" })
  category_products_menus: CategoryProductsMenus;

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

  @Column()
  product_avatar: string;

  @Column()
  category_products_menus_id: string;

  @Expose({ name: "product_avatar" })
  getProductAvatarUrl(): string | null {
    return this.product_avatar
      ? `${process.env.PRODUCT_AVATAR}/files_products/${this.product_avatar}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductsMenu;

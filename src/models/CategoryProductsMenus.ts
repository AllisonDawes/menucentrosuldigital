import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Expose } from "class-transformer";

import Menu from "./Menu";
import ProductsMenu from "./ProductsMenu";

@Entity("category_products_menus")
class CategoryProductsMenus {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.category_products_menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @OneToMany(() => ProductsMenu, (products_menu) => products_menu, {
    cascade: true,
  })
  products_menu: ProductsMenu[];

  @Column()
  name_category: string;

  @Column()
  category_avatar: string;

  @Column()
  category_id: string;

  @Column()
  menu_id: string;

  @Expose({ name: "category_avatar" })
  getCategoryMenuAvatar(): string | null {
    return this.category_avatar
      ? `${process.env.CATEGORY_PRODUCTS_AVATAR}/files_categories/${this.category_avatar}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CategoryProductsMenus;

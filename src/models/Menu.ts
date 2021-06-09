import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import User from "./User";
import ProductsMenu from "./ProductsMenu";
import Address from "./Address";

import { Expose } from "class-transformer";

@Entity("menus")
class Menu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => ProductsMenu, (products_menu) => products_menu.menu, {
    cascade: true,
  })
  products_menu: ProductsMenu[];

  @OneToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @Column()
  address_id: string;

  @Column()
  user_id: string;

  @Column()
  background_menu_id: string;

  @Expose({ name: "background_menu" })
  getBackground_menu_url(): string | null {
    return this.background_menu_id
      ? `${process.env.BACKGROUND_MENU_URL}/files/${this.background_menu_id}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Menu;

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";
import Menu from "./Menu";
import Address from "./Address";

@Entity("favorites")
class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @Column()
  name_store: string;

  @Column()
  user_id: string;

  @Column()
  menu_id: string;

  @Column()
  address_id: string;

  @Column("boolean")
  favorited: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Favorite;

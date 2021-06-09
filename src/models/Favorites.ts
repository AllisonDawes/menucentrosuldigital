import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";

import User from "./User";
import Menu from "./Menu";

@Entity("favorites")
class Favorites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.favorites_user)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => Menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @Column("boolean")
  favorited: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Favorites;

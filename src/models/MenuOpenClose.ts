import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import Menu from "./Menu";

@Entity("menu_open_close")
class MenuOpenClose {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Menu)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @Column()
  menu_id: string;

  @Column("boolean")
  status: boolean;

  @Column("timestamp")
  hour_open: Date;

  @Column("timestamp")
  hour_close: Date;

  @Column("boolean")
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MenuOpenClose;

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Exclude, Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  email: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column("boolean")
  admin: boolean;

  @Column("boolean")
  enterprise: boolean;

  @Column()
  user_avatar: string;

  @Expose({ name: "user_avatar" })
  getAvatar_url(): string | null {
    return this.user_avatar
      ? `${process.env.AVATAR_URL}/files/${this.user_avatar}`
      : null;
  }

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  access_password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;

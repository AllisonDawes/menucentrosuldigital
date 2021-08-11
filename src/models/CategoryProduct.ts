import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Expose } from "class-transformer";

@Entity("categories_products")
class CategoryProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category_avatar: string;

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

export default CategoryProduct;

import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "../errors/AppError";
import uploadConfigCategories from "../config/uploadCategories";

import User from "../models/User";
import CategoryProduct from "../models/CategoryProduct";

interface IRequest {
  user_id: string;
  categoryProduct_id: string;
}

class DeleteCategoryProductService {
  public async execute({
    user_id,
    categoryProduct_id,
  }: IRequest): Promise<void> {
    const userRepository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const user = await userRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!user) {
      throw new AppError("User admin not found!", 400);
    }

    const category = await categoryProductRepository.findOne({
      where: { id: categoryProduct_id },
    });

    if (!category) {
      throw new AppError("Category Product is not found!", 400);
    }

    if (category.category_avatar) {
      const categoryAvatarFilePath = path.join(
        uploadConfigCategories.directory,
        category.category_avatar
      );

      const categoryAvatarFileExists = await fs.promises.stat(
        categoryAvatarFilePath
      );

      if (categoryAvatarFileExists) {
        await fs.promises.unlink(categoryAvatarFilePath);
      }
    }

    await categoryProductRepository.remove(category);

    return;
  }
}

export default DeleteCategoryProductService;

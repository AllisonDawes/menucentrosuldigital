import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadCategoriesConfig from "../config/uploadCategories";
import AppError from "../errors/AppError";

import User from "../models/User";
import CategoryProduct from "../models/CategoryProduct";

interface IRequest {
  user_id: string;
  category_product_id: string;
  AvatarCategoryProductsFileName: string;
}

class UpdateAvatarCategoryProductsService {
  public async execute({
    user_id,
    category_product_id,
    AvatarCategoryProductsFileName,
  }: IRequest): Promise<CategoryProduct> {
    const userRepository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const admin = await userRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!admin) {
      throw new AppError("User administrator not found.", 400);
    }

    const categoryProduct = await categoryProductRepository.findOne({
      where: { id: category_product_id },
    });

    if (!categoryProduct) {
      throw new AppError("Category not found.", 400);
    }

    if (categoryProduct.category_avatar) {
      const categoryAvatarFilePath = path.join(
        uploadCategoriesConfig.directory,
        categoryProduct.category_avatar
      );

      const menuBackgroundImageFileExists = await fs.promises.stat(
        categoryAvatarFilePath
      );

      if (menuBackgroundImageFileExists) {
        await fs.promises.unlink(categoryAvatarFilePath);
      }
    }

    categoryProduct.category_avatar = AvatarCategoryProductsFileName;

    await categoryProductRepository.save(categoryProduct);

    return categoryProduct;
  }
}

export default UpdateAvatarCategoryProductsService;

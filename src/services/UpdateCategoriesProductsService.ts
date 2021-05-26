import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import CategoryProduct from "../models/CategoryProduct";

interface IRequest {
  user_id: string;
  categoryProduct_id: string;
  name: string;
}

class UpdateCategoryProductService {
  public async execute({
    name,
    user_id,
    categoryProduct_id,
  }: IRequest): Promise<CategoryProduct> {
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

    category.name = name;

    await categoryProductRepository.save(category);

    return category;
  }
}

export default UpdateCategoryProductService;

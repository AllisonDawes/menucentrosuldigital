import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import CategoryProduct from "../models/CategoryProduct";

interface IRequest {
  user_id: string;
  name: string;
}

class CreateCategoryProductService {
  public async execute({ name, user_id }: IRequest): Promise<CategoryProduct> {
    const userRepository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const user = await userRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!user) {
      throw new AppError("User admin not found!", 400);
    }

    const findCategory = await categoryProductRepository.findOne({
      where: { name },
    });

    if (findCategory) {
      throw new AppError("Category already in use!", 400);
    }

    const category = categoryProductRepository.create({
      name,
    });

    await categoryProductRepository.save(category);

    return category;
  }
}

export default CreateCategoryProductService;

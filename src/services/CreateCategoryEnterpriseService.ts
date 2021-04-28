import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Category from "../models/Category";
import User from "../models/User";

interface IRequest {
  admin_id: string;
  name_category: string;
}

class CreateCategoryEnterpriseService {
  public async execute({
    admin_id,
    name_category,
  }: IRequest): Promise<Category> {
    const categoryRepository = getRepository(Category);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!user) {
      throw new AppError("User not have permission", 401);
    }

    const findCategory = await categoryRepository.findOne({
      where: { name_category },
    });

    if (findCategory) {
      throw new AppError("Category enterprise already exists.", 400);
    }

    const category = categoryRepository.create({
      name_category,
    });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryEnterpriseService;

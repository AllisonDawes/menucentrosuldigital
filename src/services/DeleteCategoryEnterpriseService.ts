import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Category from "../models/Category";
import User from "../models/User";

interface IRequest {
  admin_id: string;
  category_id: string;
}

class DeleteCategoryEnterpriseService {
  public async execute({ admin_id, category_id }: IRequest): Promise<void> {
    const categoryRepository = getRepository(Category);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!user) {
      throw new AppError("User not have permission", 401);
    }

    const categories = await categoryRepository.findOne({
      where: { id: category_id },
    });

    if (!categories) {
      throw new AppError("Categories not found.", 400);
    }

    await categoryRepository.remove(categories);

    return;
  }
}

export default DeleteCategoryEnterpriseService;

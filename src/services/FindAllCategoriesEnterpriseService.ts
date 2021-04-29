import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Category from "../models/Category";
import User from "../models/User";

interface IRequest {
  admin_id: string;
}

class FindAllCategoriesEnterpriseService {
  public async execute({ admin_id }: IRequest): Promise<Category[]> {
    const categoryRepository = getRepository(Category);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: admin_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not have permission", 401);
    }

    const categories = await categoryRepository.find();

    if (!categories) {
      throw new AppError("Categories not found.", 400);
    }

    return categories;
  }
}

export default FindAllCategoriesEnterpriseService;

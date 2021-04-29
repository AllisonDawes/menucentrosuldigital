import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Category from "../models/Category";

class FindAllCategoriesEnterpriseService {
  public async execute(): Promise<Category[]> {
    const categoryRepository = getRepository(Category);

    const categories = await categoryRepository.find();

    if (!categories) {
      throw new AppError("Categories not found.", 400);
    }

    return categories;
  }
}

export default FindAllCategoriesEnterpriseService;

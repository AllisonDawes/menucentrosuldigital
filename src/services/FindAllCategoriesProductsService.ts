import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import CategoryProduct from "../models/CategoryProduct";

class FindAllCategoriesProductsService {
  public async execute(): Promise<CategoryProduct[]> {
    const categoryProductRepository = getRepository(CategoryProduct);

    const categories = await categoryProductRepository.find();

    if (!categories) {
      throw new AppError("Categories not found!", 400);
    }

    return categories;
  }
}

export default FindAllCategoriesProductsService;

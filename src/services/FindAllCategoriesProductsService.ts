import { getRepository } from "typeorm";

import CategoryProduct from "../models/CategoryProduct";

class FindAllCategoriesProductsService {
  public async execute(): Promise<CategoryProduct[] | undefined> {
    const categoryProductRepository = getRepository(CategoryProduct);

    const categories = await categoryProductRepository.find({
      order: { name: "ASC" },
    });

    return categories;
  }
}

export default FindAllCategoriesProductsService;

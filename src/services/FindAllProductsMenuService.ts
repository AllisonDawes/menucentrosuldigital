import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  menu_id: string;
  day_week: string;
  category_product: string;
}

class FindAllProductsMenuService {
  public async execute({
    menu_id,
    day_week,
    category_product,
  }: IRequest): Promise<ProductsMenu[]> {
    const menuRepository = getRepository(Menu);
    const productsMenuRepository = getRepository(ProductsMenu);

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
    });

    if (!menu) {
      throw new AppError("Menu not found!", 400);
    }

    const products = await productsMenuRepository.find({
      where: {
        menu: { id: menu_id },
        day_week,
        category_product,
      },
    });

    if (!products) {
      throw new AppError("Products not found", 400);
    }

    return products;
  }
}

export default FindAllProductsMenuService;

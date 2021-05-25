import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  user_id: string;
  menu_id: string;
  day_week: string;
}

class FindAllProductsMenuService {
  public async execute({
    user_id,
    menu_id,
    day_week,
  }: IRequest): Promise<ProductsMenu[]> {
    const menuRepository = getRepository(Menu);
    const productsMenuRepository = getRepository(ProductsMenu);

    const menu = await menuRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!menu) {
      throw new AppError("Menu not found!", 400);
    }

    const products = await productsMenuRepository.find({
      where: { menu: { user: { id: user_id }, id: menu_id }, day_week },
    });

    if (!products) {
      throw new AppError("Products not found", 400);
    }

    return products;
  }
}

export default FindAllProductsMenuService;

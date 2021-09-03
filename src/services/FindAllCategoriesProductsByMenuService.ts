import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import CategoryProductsMenus from "../models/CategoryProductsMenus";

interface IRequest {
  menu_id: string;
}

class FindAllCategoriesProductsByMenuService {
  public async execute({
    menu_id,
  }: IRequest): Promise<CategoryProductsMenus[]> {
    const menuRepository = getRepository(Menu);
    const categoryProductsMenusRepository = getRepository(
      CategoryProductsMenus
    );

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
    });

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    const categoryProductsMenu = await categoryProductsMenusRepository.find({
      where: { menu_id },
    });

    if (!categoryProductsMenu) {
      throw new AppError("Category not found!", 400);
    }

    return categoryProductsMenu;
  }
}

export default FindAllCategoriesProductsByMenuService;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import CategoryProduct from "../models/CategoryProduct";
import CategoryProductsMenus from "../models/CategoryProductsMenus";

interface IRequest {
  user_id: string;
  name_category: string;
  menu_id: string;
}

class CreateProductByCategoryMenuService {
  public async execute({
    name_category,
    menu_id,
    user_id,
  }: IRequest): Promise<CategoryProductsMenus> {
    const menuRepository = getRepository(Menu);
    const categoryProductsRepository = getRepository(CategoryProduct);
    const categoryProductsMenusRepository = getRepository(
      CategoryProductsMenus
    );

    const menu = await menuRepository.findOne({
      where: { id: menu_id, user: { id: user_id } },
    });

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    const categoriesProducts = await categoryProductsRepository.findOne({
      where: { name: name_category },
    });

    if (!categoriesProducts) {
      throw new AppError("Category Product not found", 400);
    }

    const findCategoryProductsMenu =
      await categoryProductsMenusRepository.findOne({
        where: { name_category },
      });

    if (findCategoryProductsMenu) {
      throw new AppError("Category already exists!", 400);
    }

    const categoryProductsMenus = categoryProductsMenusRepository.create({
      name_category,
      category_avatar: categoriesProducts.category_avatar,
      category_id: categoriesProducts.id,
      menu_id,
    });

    await categoryProductsMenusRepository.save(categoryProductsMenus);

    return categoryProductsMenus;
  }
}

export default CreateProductByCategoryMenuService;

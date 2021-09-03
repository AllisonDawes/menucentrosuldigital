import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import CategoryProductsMenus from "../models/CategoryProductsMenus";

interface IRequest {
  user_id: string;
  category_id: string;
}

class DeleteCategoryProductsMenuService {
  public async execute({ user_id, category_id }: IRequest): Promise<void> {
    const menuRepository = getRepository(Menu);
    const categoryProductsMenuRepository = getRepository(CategoryProductsMenus);

    const menu = await menuRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    const category = await categoryProductsMenuRepository.findOne({
      where: { id: category_id },
    });

    if (!category) {
      throw new AppError("Category product not found.", 400);
    }

    await categoryProductsMenuRepository.remove(category);

    return;
  }
}

export default DeleteCategoryProductsMenuService;

import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateProductByCategoryMenuService from "../services/CreateProductByCategoryMenuService";
import DeleteCategoryProductsMenuService from "../services/DeleteCategoryProductsMenuService";
import FindAllCategoriesProductsByMenuService from "../services/FindAllCategoriesProductsByMenuService";

class CategoryProductByMenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.params;

    const findAllCategoriesProductsByMenu =
      new FindAllCategoriesProductsByMenuService();

    const categories = await findAllCategoriesProductsByMenu.execute({
      menu_id,
    });

    return response.status(201).json(classToClass(categories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name_category, menu_id } = request.body;

    const createProductByCategoryMenu =
      new CreateProductByCategoryMenuService();

    const category = await createProductByCategoryMenu.execute({
      user_id,
      name_category,
      menu_id,
    });

    return response.status(201).json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { category_id } = request.params;

    const deleteCategoryProductsMenu = new DeleteCategoryProductsMenuService();

    await deleteCategoryProductsMenu.execute({
      user_id,
      category_id,
    });

    return response.status(200).json();
  }
}

export default CategoryProductByMenuController;

import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateCategoryProductService from "../services/CreateCategoryProductService";
import FindAllCategoriesProductsService from "../services/FindAllCategoriesProductsService";
import UpdateCategoryProductService from "../services/UpdateCategoriesProductsService";
import DeleteCategoryProductService from "../services/DeleteCategoryProductService";

class CategoriesProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllCategoriesProducts = new FindAllCategoriesProductsService();

    const category = await findAllCategoriesProducts.execute();

    return response.status(200).json(classToClass(category));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createCategoryProduct = new CreateCategoryProductService();

    const category = await createCategoryProduct.execute({
      user_id,
      name,
    });

    return response.status(200).json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { categoryProduct_id } = request.params;
    const { name } = request.body;

    const updateCategoryProduct = new UpdateCategoryProductService();

    const category = await updateCategoryProduct.execute({
      user_id,
      categoryProduct_id,
      name,
    });

    return response.status(200).json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { categoryProduct_id } = request.params;

    const deleteCategoryProduct = new DeleteCategoryProductService();

    const category = await deleteCategoryProduct.execute({
      user_id,
      categoryProduct_id,
    });

    return response.status(200).json(category);
  }
}

export default CategoriesProductsController;

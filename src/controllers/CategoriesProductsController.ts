import { Request, Response } from "express";

import CreateCategoryProductService from "../services/CreateCategoryProductService";

class CategoriesProductsController {
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
}

export default CategoriesProductsController;

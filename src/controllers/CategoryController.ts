import { Request, Response } from "express";

import CreateCategoryEnterpriseService from "../services/CreateCategoryEnterpriseService";

class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { name_category } = request.body;

    const createCategoryEnterprise = new CreateCategoryEnterpriseService();

    const category = await createCategoryEnterprise.execute({
      admin_id,
      name_category,
    });

    return response.status(201).json(category);
  }
}

export default CategoryController;

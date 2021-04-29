import { Request, Response } from "express";

import CreateCategoryEnterpriseService from "../services/CreateCategoryEnterpriseService";
import FindAllCategoriesEnterpriseService from "../services/FindAllCategoriesEnterpriseService";
import UpdateCategoryEnterpriseService from "../services/UpdateCategoryEnterpriseService";
import DeleteCategoryEnterpriseService from "../services/DeleteCategoryEnterpriseService";

class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllCategoriesEnterprise = new FindAllCategoriesEnterpriseService();

    const category = await findAllCategoriesEnterprise.execute();

    return response.status(201).json(category);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { category_id } = request.params;
    const { name_category } = request.body;

    const updateCategoryEnterprise = new UpdateCategoryEnterpriseService();

    const category = await updateCategoryEnterprise.execute({
      admin_id,
      category_id,
      name_category,
    });

    return response.status(201).json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { category_id } = request.params;

    const deleteCategoryEnterprise = new DeleteCategoryEnterpriseService();

    const category = await deleteCategoryEnterprise.execute({
      admin_id,
      category_id,
    });

    return response.status(201).json(category);
  }
}

export default CategoryController;

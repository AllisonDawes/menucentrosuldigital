import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindAllProductsMenuService from "../services/FindAllProductsMenuService";
import FindAllProductsMenuEnterpriseService from "../services/FindAllProductsMenuEnterpriseService";
import CreateProductMenuService from "../services/CreateProductMenuService";
import UpdateProductMenuService from "../services/UpdateProductMenuService";
import DeleteProductMenuService from "../services/DeleteProductMenuService";

class MenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day_week, menu_id, category_product } = request.query;

    const findAllProductsMenu = new FindAllProductsMenuService();

    const productMenu = await findAllProductsMenu.execute({
      menu_id: String(menu_id),
      day_week: String(day_week),
      category_product: String(category_product),
    });

    return response.status(200).json(classToClass(productMenu));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day_week, menu_id, category_product } = request.query;

    const findAllProductsMenuEnterprise =
      new FindAllProductsMenuEnterpriseService();

    const productMenu = await findAllProductsMenuEnterprise.execute({
      user_id,
      menu_id: String(menu_id),
      day_week: String(day_week),
      category_product: String(category_product),
    });

    return response.status(200).json(classToClass(productMenu));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      city,
      name_product,
      description,
      price,
      category_product,
      day_week,
    } = request.body;

    const createcreateProductsMenu = new CreateProductMenuService();

    const productMenu = await createcreateProductsMenu.execute({
      user_id,
      city,
      name_product,
      description,
      price,
      category_product,
      day_week,
    });

    return response.status(201).json(classToClass(productMenu));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { product_id } = request.params;
    const {
      city,
      name_product,
      description,
      price,
      category_product,
      day_week,
      active,
    } = request.body;

    const updateProductMenuService = new UpdateProductMenuService();

    const productMenu = await updateProductMenuService.execute({
      user_id,
      product_id,
      city,
      name_product,
      description,
      price,
      category_product,
      day_week,
      active,
    });

    return response.status(200).json(classToClass(productMenu));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { product_id } = request.params;
    const { city } = request.body;

    const deleteProductMenuService = new DeleteProductMenuService();

    await deleteProductMenuService.execute({
      user_id,
      product_id,
      city,
    });

    return response.status(200).json();
  }
}

export default MenuController;

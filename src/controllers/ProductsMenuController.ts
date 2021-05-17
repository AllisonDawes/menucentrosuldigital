import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateProductMenuService from "../services/CreateProductMenuService";
import FindAllProductsMenuService from "../services/FindAllProductsMenuService";

class MenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day_disponible, menu_id } = request.query;

    const findAllProductsMenu = new FindAllProductsMenuService();

    const productMenu = await findAllProductsMenu.execute({
      user_id,
      menu_id: String(menu_id),
      day_disponible: String(day_disponible),
    });

    return response.status(201).json(classToClass(productMenu));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      city,
      name_product,
      description,
      price,
      category_product,
      day_disponible,
      active,
    } = request.body;

    const createcreateProductsMenu = new CreateProductMenuService();

    const productMenu = await createcreateProductsMenu.execute({
      user_id,
      city,
      name_product,
      description,
      price,
      category_product,
      day_disponible,
      active,
    });

    return response.status(201).json(classToClass(productMenu));
  }
}

export default MenuController;

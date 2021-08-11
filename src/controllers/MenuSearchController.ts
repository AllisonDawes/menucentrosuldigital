import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindSearchMenuByNameService from "../services/FindSearchMenuByNameService";
import FindMenuByIdService from "../services/FindMenuByIdService";

class MenuSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name_store, uf, city } = request.query;

    const findSearchMenuByName = new FindSearchMenuByNameService();

    const menus = await findSearchMenuByName.execute({
      name_store: String(name_store),
      uf: String(uf),
      city: String(city),
    });

    return response.status(200).json(classToClass(menus));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.params;

    const findMenuByIdService = new FindMenuByIdService();

    const menu = await findMenuByIdService.execute({
      menu_id,
    });

    return response.status(200).json(classToClass(menu));
  }
}

export default MenuSearchController;

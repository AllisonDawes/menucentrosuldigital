import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindMenuUserService from "../services/FindMenuUserService";
import CreateMenuService from "../services/CreateMenuService";
import DeleteMenuUserService from "../services/DeleteMenuUserService";

class MenuController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { city } = request.params;

    const findMenuUser = new FindMenuUserService();

    const menu = await findMenuUser.execute({
      user_id,
      city,
    });

    return response.status(200).json(classToClass(menu));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { city } = request.body;

    const createMenu = new CreateMenuService();

    const menu = await createMenu.execute({
      user_id,
      city,
    });

    return response.status(201).json(classToClass(menu));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { city } = request.params;

    const deleteMenuUser = new DeleteMenuUserService();

    await deleteMenuUser.execute({
      user_id,
      city,
    });

    return response.status(200).json();
  }
}

export default MenuController;

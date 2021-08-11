import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindMenuClientByCityService from "../services/FindMenuClientByCityService";
import FindMenuUserService from "../services/FindMenuUserService";
import CreateMenuService from "../services/CreateMenuService";
import DeleteMenuUserService from "../services/DeleteMenuUserService";
import UpdateMenuAvatarService from "../services/UpdateMenuAvatarService";

class MenuController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findMenuClientByCity = new FindMenuClientByCityService();
    const { city, uf } = request.query;

    const menus = await findMenuClientByCity.execute({
      city: String(city),
      uf: String(uf),
    });

    return response.status(200).json(classToClass(menus));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findMenuUser = new FindMenuUserService();

    const menu = await findMenuUser.execute({
      user_id,
    });

    return response.status(200).json(classToClass(menu));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name_store } = request.body;

    const createMenu = new CreateMenuService();

    const menu = await createMenu.execute({
      user_id,
      name_store,
    });

    return response.status(201).json(classToClass(menu));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.params;

    const updateMenuAvatar = new UpdateMenuAvatarService();

    const menu = await updateMenuAvatar.execute({
      menu_id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(classToClass(menu));
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

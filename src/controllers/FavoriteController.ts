import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindAllFavoritesMenusByUserService from "../services/FindAllFavoritesMenusByUserService";
import FindFavoriteMenuService from "../services/FindFavoriteMenuService";
import CreateFavoriteMenuService from "../services/CreateFavoriteMenuService";
import DeleteFavoriteMenuService from "../services/DeleteFavoriteService";

class FavoriteController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllFavoritesMenusByUser =
      new FindAllFavoritesMenusByUserService();

    const favorites = await findAllFavoritesMenusByUser.execute({
      user_id,
    });

    return response.status(200).json(classToClass(favorites));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { menu_id } = request.params;

    const findFavoriteMenu = new FindFavoriteMenuService();

    const favorite = await findFavoriteMenu.execute({
      menu_id,
      user_id,
    });

    return response.status(200).json(classToClass(favorite));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { menu_id, name_store } = request.body;

    const createFavoriteMenu = new CreateFavoriteMenuService();

    const favorite = await createFavoriteMenu.execute({
      user_id,
      menu_id,
      name_store,
      favorited: true,
    });

    return response.status(201).json(favorite);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { menu_id } = request.params;

    const deleteFavoriteMenu = new DeleteFavoriteMenuService();

    await deleteFavoriteMenu.execute({
      user_id,
      menu_id,
    });

    return response.status(200).json();
  }
}

export default FavoriteController;

import { Request, Response } from "express";

import CreateFavoriteMenuService from "../services/CreateFavoriteMenuService";

class FavoritesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { menu_id } = request.params;

    const createFavoriteMenu = new CreateFavoriteMenuService();

    const favorite = await createFavoriteMenu.execute({
      user_id,
      menu_id,
    });

    return response.status(200).json(favorite);
  }
}

export default FavoritesController;

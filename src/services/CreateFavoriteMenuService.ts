import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import Favorites from "../models/Favorites";

interface IRequest {
  user_id: string;
  menu_id: string;
}

class CreateFavoritesMenuService {
  public async execute({ user_id, menu_id }: IRequest): Promise<Favorites> {
    const menuRepository = getRepository(Menu);
    const favoritesRepository = getRepository(Favorites);

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
    });

    if (!menu) {
      throw new AppError("Menu not fround.", 400);
    }

    const findFavorite = await favoritesRepository.findOne({
      where: { menu: { id: menu_id }, user: { id: user_id } },
    });

    if (!findFavorite) {
      const favorite = favoritesRepository.create({
        favorited: true,
        user: { id: user_id },
        menu: { id: menu_id },
      });

      await favoritesRepository.save(favorite);

      return favorite;
    }

    if (findFavorite.favorited === true) {
      findFavorite.favorited = false;
    } else {
      findFavorite.favorited = true;
    }

    await favoritesRepository.save(findFavorite);

    return findFavorite;
  }
}

export default CreateFavoritesMenuService;

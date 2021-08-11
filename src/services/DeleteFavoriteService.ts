import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Favorite from "../models/Favorite";

interface IRequest {
  user_id: string;
  menu_id: string;
}

class DeleteFavoriteMenuService {
  public async execute({ user_id, menu_id }: IRequest) {
    const favoriteRepository = getRepository(Favorite);

    const findFavorite = await favoriteRepository.findOne({
      where: { user_id, menu_id },
    });

    if (findFavorite?.user_id !== user_id) {
      throw new AppError("User not have permission.", 400);
    }

    if (!findFavorite) {
      throw new AppError("Menu is not favorited!", 400);
    }

    await favoriteRepository.remove(findFavorite);

    return;
  }
}

export default DeleteFavoriteMenuService;

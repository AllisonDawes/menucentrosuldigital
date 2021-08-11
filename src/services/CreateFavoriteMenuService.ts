import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Favorite from "../models/Favorite";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  menu_id: string;
  name_store: string;
  favorited: boolean;
}

class CreateFavoriteMenuService {
  public async execute({
    user_id,
    menu_id,
    name_store,
    favorited,
  }: IRequest): Promise<Favorite> {
    const favoriteRepository = getRepository(Favorite);
    const menuRepository = getRepository(Menu);

    await favoriteRepository.findOne({
      where: { user_id },
    });

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
      relations: ["address"],
    });

    if (!menu) {
      throw new AppError("Menu is not found.", 400);
    }

    const favorite = favoriteRepository.create({
      name_store,
      favorited,
      user_id,
      menu_id,
      address_id: menu.address_id,
    });

    await favoriteRepository.save(favorite);

    return favorite;
  }
}

export default CreateFavoriteMenuService;

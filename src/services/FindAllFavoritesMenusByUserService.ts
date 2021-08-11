import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Favorite from "../models/Favorite";

interface IRequest {
  user_id: string;
}

class FindAllFavoritesMenusByUserService {
  public async execute({ user_id }: IRequest): Promise<Favorite[]> {
    const favoriteRepository = getRepository(Favorite);

    const favorites = await favoriteRepository.find({
      where: { user_id },
      relations: ["menu", "address", "user"],
    });

    if (!favorites) {
      throw new AppError("Favorites is not found.", 400);
    }

    return favorites;
  }
}

export default FindAllFavoritesMenusByUserService;

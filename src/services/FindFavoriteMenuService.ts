import { getRepository } from "typeorm";

import Favorite from "../models/Favorite";

interface IRequest {
  menu_id: string;
  user_id: string;
}

class FindFavoriteMenuService {
  public async execute({
    menu_id,
    user_id,
  }: IRequest): Promise<Favorite | undefined> {
    const favoriteRepository = getRepository(Favorite);

    const favorite = await favoriteRepository.findOne({
      where: { menu_id, user_id },
      relations: ["menu", "address"],
    });

    return favorite || undefined;
  }
}

export default FindFavoriteMenuService;

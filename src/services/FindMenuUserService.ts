import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  city: string;
}

class FindMenuUserService {
  public async execute({ user_id, city }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    const menu = await menuRepository.findOne({
      where: { user: user_id },
      relations: ["user"],
    });

    if (menu?.user.city !== city) {
      throw new AppError("Menu is not registered in this city!", 400);
    }

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    return menu;
  }
}

export default FindMenuUserService;

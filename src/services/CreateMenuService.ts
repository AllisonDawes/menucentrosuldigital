import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  city: string;
}

class CreateMenuService {
  public async execute({ user_id, city }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    const menuExists = await menuRepository.findOne({
      where: { user: user_id },
      relations: ["user"],
    });

    if (menuExists?.user.city === city) {
      throw new AppError("User already has a registered menu in this city");
    }

    const menu = menuRepository.create({
      user: { id: user_id },
    });

    await menuRepository.save(menu);

    return menu;
  }
}

export default CreateMenuService;

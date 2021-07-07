import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  city: string;
}

class DeleteMenuUserService {
  public async execute({ user_id, city }: IRequest): Promise<void> {
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
      relations: ["user", "address"],
    });

    if (!menu?.address.active === true) {
      throw new AppError("Address active is not found!", 400);
    }

    if (menu?.address.city !== city) {
      throw new AppError("Menu is not registered in this city!", 400);
    }

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    await menuRepository.remove(menu);

    return;
  }
}

export default DeleteMenuUserService;

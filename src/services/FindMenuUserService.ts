import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
}

class FindMenuUserService {
  public async execute({ user_id }: IRequest): Promise<Menu> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);
    const menuRepository = getRepository(Menu);

    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    const addressUserActive = await addressRepository.findOne({
      where: { user: { id: user_id }, active: true },
    });

    if (!addressUserActive) {
      throw new AppError("User not have address active.", 400);
    }

    const menu = await menuRepository.findOne({
      where: {
        user: { id: user_id },
        address_id: addressUserActive.id,
      },
      relations: ["user", "address"],
    });

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    return menu;
  }
}

export default FindMenuUserService;

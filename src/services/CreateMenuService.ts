import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
}

class CreateMenuService {
  public async execute({ user_id }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    //Verificar se o usuário existe:
    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    const addressExists = await addressRepository.findOne({
      where: { user: { id: user_id }, active: true },
    });

    if (!addressExists) {
      throw new AppError("Address not found.");
    }

    const menuExists = await menuRepository.find({
      where: { user: { id: user_id, enterprise: true } },
      relations: ["address"],
    });

    const menuExistsAddresActive = menuExists.filter((a) => {
      return a.address.active === true;
    });

    if (menuExistsAddresActive.length > 0) {
      throw new AppError("Menu already registered in the city!", 404);
    }

    const menu = menuRepository.create({
      user_id: user.id,
      address: { id: addressExists.id },
    });

    await menuRepository.save(menu);

    return menu;
  }
}

export default CreateMenuService;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import Address from "../models/Address";

interface IRequest {
  user_id: string;
}

class FindAllMenuCityService {
  public async execute({ user_id }: IRequest): Promise<Menu[]> {
    const menuRepository = getRepository(Menu);
    const addressRepository = getRepository(Address);

    //busca endereço ativo do usuário:
    const addressUserActive = await addressRepository.findOne({
      where: { user: { id: user_id }, active: true },
    });

    if (!addressUserActive) {
      throw new AppError("User not have address active.", 400);
    }

    //busca todos os menus na base de dados:
    const menu = await menuRepository.find({
      relations: ["user", "address"],
    });

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    const menus = menu.filter((menu) => {
      return menu.address.city === addressUserActive.city;
    });

    return menus;
  }
}

export default FindAllMenuCityService;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";

interface IRequest {
  city?: string;
  uf?: string;
}

class FindMenuClientByCityService {
  public async execute({ city, uf }: IRequest): Promise<Menu[]> {
    const menuRepository = getRepository(Menu);

    //busca todos os menus na base de dados:
    const menu = await menuRepository.find({
      relations: ["user", "address"],
    });

    const menus = menu.filter((menu) => {
      return menu.address
        ? menu?.address.city === city && menu?.address.uf === uf
        : null;
    });

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    return menus;
  }
}

export default FindMenuClientByCityService;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import Address from "../models/Address";

interface IRequest {
  city: string;
  uf: string;
}

class FindMenuClientDesloggedByCityService {
  public async execute({ city, uf }: IRequest): Promise<Menu[]> {
    const menuRepository = getRepository(Menu);
    const addressRepository = getRepository(Address);

    //busca todos os menus na base de dados:
    const menu = await menuRepository.find({
      relations: ["user", "address"],
    });

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    const menus = menu.filter((menu) => {
      return menu.address.city === city && menu.address.uf === uf;
    });

    return menus;
  }
}

export default FindMenuClientDesloggedByCityService;

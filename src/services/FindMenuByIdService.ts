import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";

interface IRequest {
  menu_id: string;
}

class FindMenuByIdService {
  public async execute({ menu_id }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);

    //busca todos os menus na base de dados:
    const menu = await menuRepository.findOne({
      where: { id: menu_id },
      relations: ["user", "address"],
    });

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    return menu;
  }
}

export default FindMenuByIdService;

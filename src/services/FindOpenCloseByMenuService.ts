import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import MenuOpenClose from "../models/MenuOpenClose";
import Menu from "../models/Menu";

interface IRequest {
  menu_id: string;
}

class CreateHourOpenCloseMenuService {
  public async execute({ menu_id }: IRequest): Promise<MenuOpenClose> {
    const menuOpenCloseRepository = getRepository(MenuOpenClose);
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
    });

    if (!menu) {
      throw new AppError("Menu not found!", 400);
    }

    const findMenuOpenClose = await menuOpenCloseRepository.findOne({
      where: { menu: { id: menu.id } },
    });

    if (!findMenuOpenClose) {
      throw new AppError("time not found!", 400);
    }

    return findMenuOpenClose;
  }
}

export default CreateHourOpenCloseMenuService;

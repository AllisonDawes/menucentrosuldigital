import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import MenuOpenClose from "../models/MenuOpenClose";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
}

class DeleteOpenCloseMenuService {
  public async execute({ user_id }: IRequest): Promise<void> {
    const menuOpenCloseRepository = getRepository(MenuOpenClose);
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    const menuOpenClose = await menuOpenCloseRepository.findOne({
      where: { menu: { id: menu.id } },
    });

    console.log(menuOpenClose);

    if (!menuOpenClose) {
      throw new AppError("Time not found.", 400);
    }

    await menuOpenCloseRepository.remove(menuOpenClose);

    return;
  }
}

export default DeleteOpenCloseMenuService;

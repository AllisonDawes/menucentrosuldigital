import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import MenuOpenClose from "../models/MenuOpenClose";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  status: boolean;
  hour_open: Date;
  hour_close: Date;
}

class CreateHourOpenCloseMenuService {
  public async execute({
    user_id,
    status,
    hour_open,
    hour_close,
  }: IRequest): Promise<MenuOpenClose> {
    const menuOpenCloseRepository = getRepository(MenuOpenClose);
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne({
      where: { user_id },
    });

    if (!menu) {
      throw new AppError("Menu not found!", 400);
    }

    const findMenuOpenClose = await menuOpenCloseRepository.findOne({
      where: { menu: { id: menu.id } },
    });

    if (findMenuOpenClose) {
      findMenuOpenClose.hour_open = hour_open;
      findMenuOpenClose.hour_close = hour_close;

      await menuOpenCloseRepository.save(findMenuOpenClose);

      return findMenuOpenClose;
    }

    const menuOpenClose = menuOpenCloseRepository.create({
      status,
      hour_open,
      hour_close,
      menu_id: menu.id,
    });

    await menuOpenCloseRepository.save(menuOpenClose);

    return menuOpenClose;
  }
}

export default CreateHourOpenCloseMenuService;

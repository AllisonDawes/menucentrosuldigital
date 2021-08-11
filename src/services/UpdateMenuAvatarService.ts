import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

import Menu from "../models/Menu";

interface IRequest {
  menu_id: string;
  avatarFileName: string;
}

class UpdateMenuAvatarService {
  public async execute({ menu_id, avatarFileName }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne(menu_id);

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    if (menu.menu_avatar) {
      const menuAvatarFilePath = path.join(
        uploadConfig.directory,
        menu.menu_avatar
      );

      const menuAvatarFileExists = await fs.promises.stat(menuAvatarFilePath);

      if (menuAvatarFileExists) {
        await fs.promises.unlink(menuAvatarFilePath);
      }
    }

    menu.menu_avatar = avatarFileName;

    await menuRepository.save(menu);

    return menu;
  }
}

export default UpdateMenuAvatarService;

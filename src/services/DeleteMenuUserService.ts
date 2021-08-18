import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "../errors/AppError";
import uploadConfig from "../config/upload";

import User from "../models/User";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  city: string;
}

class DeleteMenuUserService {
  public async execute({ user_id, city }: IRequest): Promise<void> {
    const userRepository = getRepository(User);
    const menuRepository = getRepository(Menu);

    //Busca usuário logado:
    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    // Busca Menu cadastrado na conta do usuário logado:
    const menu = await menuRepository.findOne({
      where: { user: { id: user_id } },
      relations: ["user", "address"],
    });

    if (!menu?.address.active === true) {
      throw new AppError("Address active is not found!", 400);
    }

    if (menu?.address.city !== city) {
      throw new AppError("Menu is not registered in this city!", 400);
    }

    if (!menu) {
      throw new AppError("Menu not found", 400);
    }

    // Deleta imagem do avatar do menu no servidor:
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

    // Deleta imagem do background do menu no servidor:
    if (menu.background_menu_id) {
      const menuBackgroundFilePath = path.join(
        uploadConfig.directory,
        menu.background_menu_id
      );

      const menuBackgroundFileExists = await fs.promises.stat(
        menuBackgroundFilePath
      );

      if (menuBackgroundFileExists) {
        await fs.promises.unlink(menuBackgroundFilePath);
      }
    }

    // Remove registro do menu do usuário no BD:
    await menuRepository.remove(menu);

    return;
  }
}

export default DeleteMenuUserService;

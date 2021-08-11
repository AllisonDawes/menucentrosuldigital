import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

import Menu from "../models/Menu";

interface IRequest {
  menu_id: string;
  backgroundFileName: string;
}

class UpdateBackgroundImageMenuService {
  public async execute({
    menu_id,
    backgroundFileName,
  }: IRequest): Promise<Menu> {
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne(menu_id);

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    if (menu.background_menu_id) {
      const menuBackgroundImageFilePath = path.join(
        uploadConfig.directory,
        menu.background_menu_id
      );

      const menuBackgroundImageFileExists = await fs.promises.stat(
        menuBackgroundImageFilePath
      );

      if (menuBackgroundImageFileExists) {
        await fs.promises.unlink(menuBackgroundImageFilePath);
      }
    }

    menu.background_menu_id = backgroundFileName;

    await menuRepository.save(menu);

    return menu;
  }
}

export default UpdateBackgroundImageMenuService;

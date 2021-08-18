import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "../errors/AppError";
import uploadConfig from "../config/upload";

import User from "../models/User";
import Address from "../models/Address";
import Menu from "../models/Menu";

interface IRequest {
  profile_id: string;
}

class DeleteProfileService {
  public async execute({ profile_id }: IRequest): Promise<void> {
    const profileRepository = getRepository(User);
    const addressRepository = getRepository(Address);
    const menuRepository = getRepository(Menu);

    const profile = await profileRepository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Profile not found.", 401);
    }

    if (profile.user_avatar) {
      const profileAvatarFilePath = path.join(
        uploadConfig.directory,
        profile.user_avatar
      );

      const profileAvatarFileExists = await fs.promises.stat(
        profileAvatarFilePath
      );

      if (profileAvatarFileExists) {
        await fs.promises.unlink(profileAvatarFilePath);
      }
    }

    const menu = await menuRepository.findOne({
      where: { user_id: profile_id },
    });

    if (menu?.menu_avatar) {
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
    }

    if (menu?.background_menu_id) {
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

    // Busca endereço cadastrado na conta do usuário logado:
    const address = await addressRepository.findOne({
      where: { user_id: profile_id },
    });

    if (!address) {
      throw new AppError("Address not found.", 400);
    }

    // Remove registros de endereço e perfil do usuário no BD:
    await addressRepository.remove(address);
    await profileRepository.remove(profile);
  }
}

export default DeleteProfileService;

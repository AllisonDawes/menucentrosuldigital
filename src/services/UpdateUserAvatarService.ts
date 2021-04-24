import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (user.user_avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.user_avatar
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.user_avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

import { getRepository } from "typeorm";
import { compare, hash } from "bcryptjs";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  user_id: string;
  old_access_password: string;
  access_password: string;
}

class UpdateAccessUserAdminService {
  public async execute({
    user_id,
    old_access_password,
    access_password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    if (!old_access_password || !access_password) {
      throw new AppError("Old password and password access required!", 400);
    }

    const userAdmin = await userRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!userAdmin) {
      throw new AppError(
        "User does not exists, or is not an administrator.",
        400
      );
    }

    if (old_access_password && !access_password) {
      throw new AppError(
        "You need to inform the old access password to set a new access password.",
        400
      );
    }

    if (old_access_password && access_password) {
      const checkAccessPassword = await compare(
        old_access_password,
        userAdmin.access_password
      );

      if (old_access_password === access_password) {
        throw new AppError(
          "Old access password must not be the same as new access password.",
          400
        );
      }

      if (!checkAccessPassword) {
        throw new AppError("Old access password does not match.", 400);
      }

      userAdmin.access_password = await hash(access_password, 8);
    }

    await userRepository.save(userAdmin);

    return userAdmin;
  }
}

export default UpdateAccessUserAdminService;

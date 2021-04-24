import { getRepository } from "typeorm";
import { compare } from "bcryptjs";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  admin_id: string;
  access_password: string;
}

class RemoveAccessUserAdminService {
  public async execute({ admin_id, access_password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const userAdmin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!userAdmin) {
      throw new AppError(
        "User not found, or do not have administrator permission"
      );
    }

    const checkAccessPassword = await compare(
      access_password,
      userAdmin.access_password
    );

    if (!checkAccessPassword) {
      throw new AppError("The access password does not match.");
    }

    userAdmin.admin = false;
    userAdmin.access_password = "";

    await userRepository.save(userAdmin);

    return userAdmin;
  }
}

export default RemoveAccessUserAdminService;

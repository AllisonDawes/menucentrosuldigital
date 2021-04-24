import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  user_id?: string;
}

class CheckExistsUserAdminService {
  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const userRepository = getRepository(User);

    const userAdmin = await userRepository.findOne({
      where: { admin: true },
    });

    if (userAdmin && userAdmin.id !== user_id) {
      throw new AppError("User not have permission!");
    }

    return userAdmin || undefined;
  }
}

export default CheckExistsUserAdminService;

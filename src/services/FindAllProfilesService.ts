import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  admin_id: string;
}

class FindAllProfilesService {
  public async execute({ admin_id }: IRequest): Promise<User[]> {
    const userRepository = getRepository(User);

    const admin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!admin) {
      throw new AppError("User administrator not found", 400);
    }

    const users = await userRepository.find({
      where: { admin: false },
    });

    return users;
  }
}

export default FindAllProfilesService;

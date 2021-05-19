import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  admin_id: string;
  profile_id: string;
}

class DeleteProfileService {
  public async execute({ profile_id, admin_id }: IRequest): Promise<void> {
    const profileRepository = getRepository(User);

    const admin = await profileRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!admin) {
      throw new AppError("User Administrator not found!", 400);
    }

    const profile = await profileRepository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Profile not found.", 401);
    }

    await profileRepository.remove(profile);
  }
}

export default DeleteProfileService;

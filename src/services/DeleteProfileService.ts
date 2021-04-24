import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  profile_id: string;
}

class DeleteProfileService {
  public async execute({ profile_id }: IRequest): Promise<void> {
    const profileRepository = getRepository(User);

    const profile = await profileRepository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Profile not found.", 401);
    }

    await profileRepository.remove(profile);
  }
}

export default DeleteProfileService;

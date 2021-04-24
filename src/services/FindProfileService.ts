import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  profile_id: string;
}

class FindProfileService {
  public async execute({ profile_id }: IRequest): Promise<User> {
    const profileRepository = getRepository(User);

    const profile = await profileRepository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Profile not found", 401);
    }

    return profile;
  }
}

export default FindProfileService;

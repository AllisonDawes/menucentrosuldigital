import { getRepository } from "typeorm";
import { compare, hash } from "bcryptjs";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  profile_id: string;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

class UpdateProfileService {
  public async execute({
    profile_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const profileRepository = getRepository(User);

    if (!name || !email) {
      throw new AppError("Name and E-mail is required!");
    }

    const profile = await profileRepository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Profile not found.", 401);
    }

    const profileWidtUpdatedEmail = await profileRepository.findOne({
      where: { email },
    });

    if (profileWidtUpdatedEmail && profileWidtUpdatedEmail.id !== profile_id) {
      throw new AppError("E-mail already in use.");
    }

    profile.name = name;
    profile.email = email;

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password."
      );
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, profile.password);

      if (password === old_password) {
        throw new AppError(
          "Old password must not be the same as new password."
        );
      }

      if (!checkPassword) {
        throw new AppError("Old password does not match.");
      }

      profile.password = await hash(password, 8);
    }

    await profileRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;

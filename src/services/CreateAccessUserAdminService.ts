import { getRepository } from "typeorm";
import { hash, compare } from "bcryptjs";

import User from "../models/User";
import AppError from "../errors/AppError";

interface IRequest {
  user_id: string;
  password: string;
  access_password: string;
}

class CreateAccessUserAdminService {
  public async execute({
    user_id,
    password,
    access_password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const userLogged = await userRepository.findOne({
      where: { id: user_id, admin: false },
    });

    if (!userLogged) {
      throw new AppError(
        "User is not registered, or is already an administrator."
      );
    }

    const usersRegistered = await userRepository.find({
      where: { admin: true },
    });

    if (usersRegistered.length > 0) {
      throw new AppError(
        "There is already an administrator in the system, only this one can grant the permissions."
      );
    }

    const passwordAuthenticated = await compare(password, userLogged.password);

    if (!passwordAuthenticated) {
      throw new AppError("Incorrect password combination.");
    }

    const accessPassHashed = await hash(access_password, 8);

    if (!accessPassHashed || access_password.length < 8) {
      throw new AppError(
        "Password cannot be empty, nor must it contain less than 8 characters."
      );
    }

    userLogged.access_password = accessPassHashed;

    userLogged.admin = true;

    await userRepository.save(userLogged);

    return userLogged;
  }
}

export default CreateAccessUserAdminService;

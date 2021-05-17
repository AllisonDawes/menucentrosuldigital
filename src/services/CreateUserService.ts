import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../errors/AppError";

import User from "../models/User";

interface IRequest {
  name: string;
  category?: string;
  email: string;
  admin: boolean;
  uf: string;
  city: string;
  enterprise: boolean;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    category,
    email,
    admin,
    uf,
    city,
    enterprise,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (
      checkUserExists?.name === name &&
      checkUserExists.city === city &&
      checkUserExists.enterprise === true
    ) {
      throw new AppError("Name enterprise already used in the town.", 400);
    }

    if (checkUserExists?.email) {
      throw new AppError("E-mail address already used.", 400);
    }

    if (!password || password.length < 6) {
      throw new AppError("Password is empty.", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      category,
      email,
      uf,
      city,
      admin,
      enterprise,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/User";

import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret!, {
      subject: user.id,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

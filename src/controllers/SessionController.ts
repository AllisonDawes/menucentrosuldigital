import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import AuthenticateUserService from "../services/AuthenticateUserService";

class SessionController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const session = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(200).json(classToClass(session));
  }
}

export default SessionController;

import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateUserService from "../services/CreateUserService";

class EnterpriseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, uf, city, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      uf,
      city,
      admin: false,
      enterprise: true,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default EnterpriseController;

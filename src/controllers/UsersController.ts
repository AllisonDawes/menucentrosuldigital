import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import DeleteAvatarUserProfileService from "../services/DaleteAvatarUserProfileService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, uf, city, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      uf,
      city,
      admin: false,
      enterprise: false,
      password,
    });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(classToClass(user));
  }
}

export default UsersController;

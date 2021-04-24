import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindInformationAdminService from "../services/FindInformationAdminService";
import CreateAccessUserAdminService from "../services/CreateAccessUserAdminService";
import UpdateAccessUserAdminService from "../services/UpdateAccessUserAdminService";
import RemoveAccessUserAdminService from "../services/RemoveAccessUserAdminService";
import CheckExistsUserAdminService from "../services/CheckExistsUserAdminService";

class AccessAdminController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const CheckExistsUserAdmin = new CheckExistsUserAdminService();

    const findAdmin = await CheckExistsUserAdmin.execute({ user_id });

    return response.status(200).json(classToClass(findAdmin));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;

    const findInformationAdmin = new FindInformationAdminService();

    const findAdmin = await findInformationAdmin.execute({
      admin_id,
    });

    return response.status(200).json(classToClass(findAdmin));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password, access_password } = request.body;

    const createAccessUserAdmin = new CreateAccessUserAdminService();

    const access = await createAccessUserAdmin.execute({
      user_id,
      password,
      access_password,
    });

    return response.status(200).json(classToClass(access));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { old_access_password, access_password } = request.body;

    const updateAccessUserAdmin = new UpdateAccessUserAdminService();

    const updateAccessAdmin = await updateAccessUserAdmin.execute({
      user_id,
      old_access_password,
      access_password,
    });

    return response.status(200).json(classToClass(updateAccessAdmin));
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { access_password } = request.body;

    const removeAccessUserAdmin = new RemoveAccessUserAdminService();

    const removeAccessUser = await removeAccessUserAdmin.execute({
      admin_id,
      access_password,
    });

    return response.status(200).json(classToClass(removeAccessUser));
  }
}

export default AccessAdminController;

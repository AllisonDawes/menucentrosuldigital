import { Request, response, Response } from "express";
import { classToClass } from "class-transformer";

import FindAllProfilesService from "../services/FindAllProfilesService";
import FindProfileService from "../services/FindProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import DeleteProfileService from "../services/DeleteProfileService";

class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;

    const findAllProfiles = new FindAllProfilesService();

    const findProfiles = await findAllProfiles.execute({ admin_id });

    return response.status(200).json(classToClass(findProfiles));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;

    const findProfile = new FindProfileService();

    const user = await findProfile.execute({
      profile_id,
    });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = new UpdateProfileService();

    const profile = await updateProfile.execute({
      profile_id,
      name,
      email,
      old_password,
      password,
    });

    return response.status(200).json(classToClass(profile));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;

    const deleteProfile = new DeleteProfileService();

    await deleteProfile.execute({
      profile_id,
    });

    return response.status(200).json();
  }
}

export default ProfileController;

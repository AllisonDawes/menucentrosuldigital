import { Request, response, Response } from "express";
import { classToClass } from "class-transformer";

import DeleteProfilesWidthAccessAdminService from "../services/DeleteProfilesWidthAccessAdminService";

class ProfileController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { profile_id } = request.params;

    const deleteProfilesWidthAccessAdmin =
      new DeleteProfilesWidthAccessAdminService();

    await deleteProfilesWidthAccessAdmin.execute({
      profile_id,
      admin_id,
    });

    return response.status(200).json();
  }
}

export default ProfileController;

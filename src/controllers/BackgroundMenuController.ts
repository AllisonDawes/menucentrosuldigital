import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import UpdateBackgroundImageMenuService from "../services/UpdateBackgroundImageMenuService";

class BackgroundMenuController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.params;

    const updateBackgroundImageMenu = new UpdateBackgroundImageMenuService();

    const menu = await updateBackgroundImageMenu.execute({
      menu_id,
      backgroundFileName: request.file.filename,
    });

    return response.status(200).json(classToClass(menu));
  }
}

export default BackgroundMenuController;

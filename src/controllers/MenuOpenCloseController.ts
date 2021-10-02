import { Request, Response } from "express";

import FindOpenCloseByMenuService from "../services/FindOpenCloseByMenuService";
import CreateHourOpenCloseMenuService from "../services/CreateHourOpenCloseMenuService";

class MenuOpenCloseController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.query;

    const findOpenCloseByMenu = new FindOpenCloseByMenuService();

    const menuOpenClose = await findOpenCloseByMenu.execute({
      menu_id: String(menu_id),
    });

    return response.status(200).json(menuOpenClose);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { status, hour_open, hour_close } = request.body;

    const createHourOpenCloseMenu = new CreateHourOpenCloseMenuService();

    const menuOpenClose = await createHourOpenCloseMenu.execute({
      user_id,
      status,
      hour_open,
      hour_close,
    });

    return response.status(201).json(menuOpenClose);
  }
}

export default MenuOpenCloseController;

import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindMenuClientDesloggedByCityService from "../services/FindMenuClientDesloggedByCityService";

class MenuClientDesloggedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findMenuClientDesloggedByCity =
      new FindMenuClientDesloggedByCityService();
    const { city, uf } = request.query;

    const menus = await findMenuClientDesloggedByCity.execute({
      city: String(city),
      uf: String(uf),
    });

    return response.status(200).json(classToClass(menus));
  }
}

export default MenuClientDesloggedController;

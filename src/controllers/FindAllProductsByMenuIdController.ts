import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindAllProductsByMenuIdClientService from "../services/FindAllProductsByMenuIdClientService";

class FindAllProductsByMenuIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { menu_id } = request.params;

    const findAllProductsByMenuIdClient =
      new FindAllProductsByMenuIdClientService();

    const products = await findAllProductsByMenuIdClient.execute({
      menu_id,
    });

    return response.status(200).json(classToClass(products));
  }
}

export default FindAllProductsByMenuIdController;

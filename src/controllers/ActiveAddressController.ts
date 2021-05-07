import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import UpdateActiveAddressService from "../services/UpdateActiveAddressService";

class ActiveAddressController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.query;

    const updateActiveAddress = new UpdateActiveAddressService();

    const address = await updateActiveAddress.execute({
      user_id,
      active: true,
      address_id: String(address_id),
    });

    return response.status(201).json(classToClass(address));
  }
}

export default ActiveAddressController;

import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import FindAllAddressUserService from "../services/FindAllAddressUserServices";
import FindAddressActiveService from "../services/FindAddressActiveService";
import CreateAddressService from "../services/CreateAddressService";
import UpdateAddressService from "../services/UpdateAddressService";
import DeleteAddressService from "../services/DeleteAddressService";

class AddressController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllAddressUser = new FindAllAddressUserService();

    const address = await findAllAddressUser.execute({
      user_id,
    });

    return response.status(201).json(classToClass(address));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAddressActive = new FindAddressActiveService();

    const address = await findAddressActive.execute({
      user_id,
    });

    return response.status(201).json(classToClass(address));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { road, number, district, city, uf, phone } = request.body;

    const createAddress = new CreateAddressService();

    const address = await createAddress.execute({
      user_id,
      road,
      number,
      district,
      city,
      uf,
      phone,
    });

    return response.status(201).json(classToClass(address));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.query;
    const { road, number, district, city, uf, phone } = request.body;

    const updateAddress = new UpdateAddressService();

    const address = await updateAddress.execute({
      user_id,
      road,
      number,
      district,
      city,
      uf,
      phone,
      address_id: String(address_id),
    });

    return response.status(201).json(classToClass(address));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.params;

    const deleteAddress = new DeleteAddressService();

    const address = await deleteAddress.execute({
      user_id,
      address_id: address_id,
    });

    return response.status(201).json(classToClass(address));
  }
}

export default AddressController;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Address from "../models/Address";
import User from "../models/User";

interface IRequest {
  address_id: string;
  user_id: string;
  active: boolean;
}

class UpdateAddressService {
  public async execute({
    address_id,
    user_id,
    active,
  }: IRequest): Promise<Address> {
    const addressRepository = getRepository(Address);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    const address = await addressRepository.findOne({
      where: { id: address_id, user: { id: user_id } },
    });

    if (!address) {
      throw new AppError("Address not found", 401);
    }

    address.active = active;

    await addressRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;

import { getRepository } from "typeorm";

import User from "../models/User";
import Address from "../models/Address";

import AppError from "../errors/AppError";

interface IRequest {
  user_id: string;
  address_id: string;
}

class FindAddressActiveService {
  public async execute({ user_id, address_id }: IRequest): Promise<Address> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    const address = await addressRepository.findOne({
      where: { id: address_id, active: true },
      relations: ["user"],
    });

    if (!address) {
      throw new AppError("Address not found.", 401);
    }

    return address;
  }
}

export default FindAddressActiveService;

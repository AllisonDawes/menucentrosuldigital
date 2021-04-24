import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";

interface IRequest {
  user_id: string;
  address_id: string;
}

class DeleteAddressService {
  public async execute({ user_id, address_id }: IRequest): Promise<void> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not fonud.", 401);
    }

    const address = await addressRepository.find({
      where: { id: address_id, user: { id: user_id } },
    });

    if (!address) {
      throw new AppError("Address not found.", 401);
    }

    await addressRepository.remove(address);

    return;
  }
}

export default DeleteAddressService;

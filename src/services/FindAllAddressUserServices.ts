import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";

interface IRequest {
  user_id: string;
}

class FindAllAddressUserService {
  public async execute({ user_id }: IRequest): Promise<Address> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not fonud.", 401);
    }

    const address = await addressRepository.findOne({
      where: { user: { id: user_id } },
      relations: ["user"],
    });

    if (!address) {
      throw new AppError("Address not found.", 401);
    }

    return address;
  }
}

export default FindAllAddressUserService;

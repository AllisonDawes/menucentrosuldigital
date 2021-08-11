import { getRepository } from "typeorm";

import User from "../models/User";
import Address from "../models/Address";

import AppError from "../errors/AppError";

interface IRequest {
  user_id: string;
}

class FindAddressActiveService {
  public async execute({ user_id }: IRequest): Promise<Address | undefined> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    const address = await addressRepository.findOne({
      where: { user: { id: user_id }, active: true },
      relations: ["user"],
    });

    return address || undefined;
  }
}

export default FindAddressActiveService;

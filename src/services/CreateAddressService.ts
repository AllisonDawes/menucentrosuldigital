import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Address from "../models/Address";
import User from "../models/User";

interface IRequest {
  user_id: string;
  road: string;
  number: string;
  district: string;
  city: string;
  uf: string;
  phone: string;
  user?: [];
}

class CreateAddressService {
  public async execute({
    user_id,
    road,
    number,
    district,
    city,
    uf,
    phone,
  }: IRequest): Promise<Address> {
    const addressRepository = getRepository(Address);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    const addressCheckEnterprise = await addressRepository.findOne({
      where: { city, uf, user: { id: user_id } },
      relations: ["user"],
    });

    if (addressCheckEnterprise?.user.enterprise === true) {
      throw new AppError("Address already use by enterprise.");
    }

    const addressCheckExists = await addressRepository.findOne({
      where: {
        road,
        number,
        district,
        city,
        uf,
        user: { id: user_id },
      },
    });

    if (addressCheckExists) {
      throw new AppError("Address already exists in your profile.", 401);
    }

    const address = addressRepository.create({
      user,
      road,
      number,
      district,
      city,
      uf,
      phone,
    });

    await addressRepository.save(address);

    return address;
  }
}

export default CreateAddressService;

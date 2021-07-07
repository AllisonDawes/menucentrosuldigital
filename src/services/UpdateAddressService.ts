import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Address from "../models/Address";
import User from "../models/User";

interface IRequest {
  address_id: string;
  user_id: string;
  road: string;
  number: string;
  district: string;
  city: string;
  uf: string;
  phone: string;
}

class UpdateAddressService {
  public async execute({
    address_id,
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

    const address = await addressRepository.findOne({
      where: { id: address_id, user: { id: user_id } },
    });

    if (!address) {
      throw new AppError("Address not found", 401);
    }

    address.road = road;
    address.number = number;
    address.district = district;
    address.city = city;
    address.uf = uf;
    address.phone = phone;

    user.uf = uf;
    user.city = city;

    await addressRepository.save(address);
    await userRepository.save(user);

    return address;
  }
}

export default UpdateAddressService;

import { getRepository } from "typeorm";

import User from "../models/User";

interface IRequest {
  admin_id: string;
}

class FindInformationAdminService {
  public async execute({ admin_id }: IRequest): Promise<User | undefined> {
    const userRepository = getRepository(User);

    const userAdmin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    return userAdmin || undefined;
  }
}

export default FindInformationAdminService;

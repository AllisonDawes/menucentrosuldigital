import { getRepository, ILike } from "typeorm";

import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  name_store: string;
  uf: string;
  city: string;
}

class FindMenuByNameService {
  public async execute({
    user_id,
    name_store,
    uf,
    city,
  }: IRequest): Promise<Menu[]> {
    const menuRepository = getRepository(Menu);

    const menusSearch = await menuRepository.find({
      where: { name_store: ILike(`%${name_store}%`) },
      relations: ["user", "address", "favorites"],
      order: { name_store: "ASC" },
    });

    const menus = menusSearch.filter((menu) => {
      return menu.address
        ? menu?.address.city === city && menu?.address.uf === uf
        : null;
    });

    return menus;
  }
}

export default FindMenuByNameService;

import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  user_id: string;
  product_id: string;
  city: string;
}

class DeleteProductMenuService {
  public async execute({ user_id, product_id, city }: IRequest): Promise<void> {
    const menuRepository = getRepository(Menu);
    const userRepository = getRepository(User);
    const productsMenuRepository = getRepository(ProductsMenu);

    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    const menuExists = await menuRepository.findOne({
      where: { user: user_id },
      relations: ["user", "products_menu"],
    });

    if (menuExists?.user.city !== city) {
      throw new AppError("Menu is not registered in this city!", 400);
    }

    if (!menuExists) {
      throw new AppError("Menu not found!", 400);
    }

    const productMenu = await productsMenuRepository.findOne({
      where: { id: product_id, menu: { id: menuExists.id } },
    });

    if (!productMenu) {
      throw new AppError("Products not found!", 400);
    }

    await productsMenuRepository.remove(productMenu);

    return;
  }
}

export default DeleteProductMenuService;

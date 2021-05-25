import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  user_id: string;
  product_id: string;
  city: string;
  name_product: string;
  description: string;
  price: number;
  category_product: string;
  day_week: string;
  active: boolean;
}

class UpdateProductMenuService {
  public async execute({
    user_id,
    product_id,
    city,
    name_product,
    description,
    price,
    category_product,
    day_week,
    active,
  }: IRequest): Promise<ProductsMenu> {
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

    productMenu.name_product = name_product;
    productMenu.description = description;
    productMenu.price = price;
    productMenu.category_product = category_product;
    productMenu.day_week = day_week;
    productMenu.active = active;

    await productsMenuRepository.save(productMenu);

    return productMenu;
  }
}

export default UpdateProductMenuService;

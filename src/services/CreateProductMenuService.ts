import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  user_id: string;
  city: string;
  name_product: string;
  description: string;
  price: number;
  category_product: string;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

class CreateProductMenuService {
  public async execute({
    user_id,
    city,
    name_product,
    description,
    price,
    category_product,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
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
      relations: ["user"],
    });

    if (menuExists?.user.city !== city) {
      throw new AppError("Menu is not registered in this city!", 400);
    }

    if (!menuExists) {
      throw new AppError("Menu not found!", 400);
    }

    const productMenuExists = await productsMenuRepository.findOne({
      where: { name_product, category_product, menu: { id: menuExists.id } },
    });

    if (productMenuExists) {
      throw new AppError("Products already is registered!", 400);
    }

    const productMenu = productsMenuRepository.create({
      name_product,
      description,
      price,
      category_product,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      menu: { id: menuExists.id },
    });

    await productsMenuRepository.save(productMenu);

    return productMenu;
  }
}

export default CreateProductMenuService;

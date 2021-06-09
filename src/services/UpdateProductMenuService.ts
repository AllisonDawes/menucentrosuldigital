import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";
import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  user_id: string;
  product_id: string;
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
  active: boolean;
}

class UpdateProductMenuService {
  public async execute({
    user_id,
    product_id,
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
    active,
  }: IRequest): Promise<ProductsMenu> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);
    const menuRepository = getRepository(Menu);
    const productsMenuRepository = getRepository(ProductsMenu);

    //busca usuário logado e do tipo empresa:
    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    //busca endereço ativo do usuário:
    const addressUserActive = await addressRepository.findOne({
      where: { user: { id: user_id }, active: true },
    });

    if (!addressUserActive) {
      throw new AppError("User not have address active.", 400);
    }

    //busca se usuário contém algum menu cadastrado:
    const menuExists = await menuRepository.findOne({
      where: { user: { id: user_id }, address_id: addressUserActive.id },
      relations: ["user", "products_menu"],
    });

    if (!menuExists) {
      throw new AppError("Menu not found!", 400);
    }

    //verifica se existe algum produto cadatrado com o id especificado:
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
    productMenu.sunday = sunday;
    productMenu.monday = monday;
    productMenu.tuesday = tuesday;
    productMenu.wednesday = wednesday;
    productMenu.thursday = thursday;
    productMenu.friday = friday;
    productMenu.saturday = saturday;
    productMenu.active = active;

    await productsMenuRepository.save(productMenu);

    return productMenu;
  }
}

export default UpdateProductMenuService;

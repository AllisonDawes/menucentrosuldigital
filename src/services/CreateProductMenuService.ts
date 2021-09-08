import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";
import Address from "../models/Address";
import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";
import CategoryProductsMenus from "../models/CategoryProductsMenus";

interface IRequest {
  user_id: string;
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
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);
    const menuRepository = getRepository(Menu);
    const productsMenuRepository = getRepository(ProductsMenu);
    const categoryProductsMenusReporitory = getRepository(
      CategoryProductsMenus
    );

    //busca usuário logado e do tipo empresa:
    const user = await userRepository.findOne({
      where: { id: user_id, enterprise: true },
    });

    if (!user) {
      throw new AppError("User not found!", 400);
    }

    //busca endereço ativo do usuário:
    const addressEnterprise = await addressRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!addressEnterprise) {
      throw new AppError("User not have address active.", 400);
    }

    //busca se usuário contém algum menu cadastrado:
    const menuExists = await menuRepository.findOne({
      where: { user: { id: user_id }, address_id: addressEnterprise.id },
      relations: ["user", "address"],
    });

    if (!menuExists) {
      throw new AppError("Menu not found!", 400);
    }

    //verifica se existe algum produto cadatrado com o mesmo nome, categoria e menu_id
    const productMenuExists = await productsMenuRepository.findOne({
      where: { name_product, category_product, menu: { id: menuExists.id } },
    });

    if (productMenuExists) {
      throw new AppError("Products already is registered!", 400);
    }

    const categoryProductsMenus = await categoryProductsMenusReporitory.findOne(
      {
        where: { name_category: category_product },
      }
    );

    if (!categoryProductsMenus) {
      throw new AppError("Category product is not found!", 400);
    }

    const productMenu = productsMenuRepository.create({
      name_product,
      description,
      price: Number(price),
      category_product,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      menu_id: menuExists.id,
      category_products_menus_id: categoryProductsMenus.id,
    });

    await productsMenuRepository.save(productMenu);

    return productMenu;
  }
}

export default CreateProductMenuService;

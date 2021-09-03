import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadProductConfig from "../config/uploadProducts";
import AppError from "../errors/AppError";

import ProductsMenu from "../models/ProductsMenu";
import Menu from "../models/Menu";

interface IRequest {
  user_id: string;
  menu_id: string;
  product_id: string;
  avatarFileName: string;
}

class UpdateMenuAvatarService {
  public async execute({
    user_id,
    menu_id,
    product_id,
    avatarFileName,
  }: IRequest): Promise<ProductsMenu> {
    const productsMenuRepository = getRepository(ProductsMenu);
    const menuRepository = getRepository(Menu);

    const menu = await menuRepository.findOne({
      where: { id: menu_id, user: { id: user_id } },
    });

    if (!menu) {
      throw new AppError("Menu not found.", 400);
    }

    const product = await productsMenuRepository.findOne(product_id);

    if (!product) {
      throw new AppError("Product not found.", 400);
    }

    if (product.product_avatar) {
      const productAvatarFilePath = path.join(
        uploadProductConfig.directory,
        product.product_avatar
      );

      const productAvatarFileExists = await fs.promises.stat(
        productAvatarFilePath
      );

      if (productAvatarFileExists) {
        await fs.promises.unlink(productAvatarFilePath);
      }
    }

    product.product_avatar = avatarFileName;

    await productsMenuRepository.save(product);

    return product;
  }
}

export default UpdateMenuAvatarService;

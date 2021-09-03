import { getRepository } from "typeorm";
import { getDay } from "date-fns";

import AppError from "../errors/AppError";

import Menu from "../models/Menu";
import ProductsMenu from "../models/ProductsMenu";

interface IRequest {
  menu_id: string;
}

class FindAllProductsByMenuIdClientService {
  public async execute({
    menu_id,
  }: IRequest): Promise<ProductsMenu[] | undefined> {
    const menuRepository = getRepository(Menu);
    const productsMenuRepository = getRepository(ProductsMenu);

    const day = getDay(new Date());

    const menu = await menuRepository.findOne({
      where: { id: menu_id },
    });

    if (!menu) {
      throw new AppError("Menu not found!", 400);
    }

    const products = await productsMenuRepository.find({
      where: {
        menu: { id: menu_id },
      },
    });

    if (day === 0) {
      const productsToday = products.filter((product) => {
        return product.sunday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 1) {
      const productsToday = products.filter((product) => {
        return product.monday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 2) {
      const productsToday = products.filter((product) => {
        return product.tuesday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 3) {
      const productsToday = products.filter((product) => {
        return product.wednesday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 4) {
      const productsToday = products.filter((product) => {
        return product.thursday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 5) {
      const productsToday = products.filter((product) => {
        return product.friday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }

    if (day === 6) {
      const productsToday = products.filter((product) => {
        return product.saturday === true;
      });

      if (!productsToday) {
        throw new AppError("Products not found", 400);
      }

      return productsToday;
    }
  }
}

export default FindAllProductsByMenuIdClientService;

import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryProductByMenuController from "../controllers/CategoryProductsByMenuController";

const categoryProductsMenu = Router();
const categoryProductByMenuController = new CategoryProductByMenuController();

categoryProductsMenu.get("/:menu_id", categoryProductByMenuController.index);

categoryProductsMenu.use(ensureAuthenticated);

categoryProductsMenu.post("/", categoryProductByMenuController.create);
categoryProductsMenu.delete(
  "/:category_id",
  categoryProductByMenuController.delete
);

export default categoryProductsMenu;

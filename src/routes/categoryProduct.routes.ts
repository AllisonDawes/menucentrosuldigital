import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoriesProductsController from "../controllers/CategoriesProductsController";

const categoryProductRouter = Router();
const categoriesProductsController = new CategoriesProductsController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.get("/", categoriesProductsController.index);
categoryProductRouter.post("/", categoriesProductsController.create);
categoryProductRouter.put(
  "/:categoryProduct_id",
  categoriesProductsController.update
);
categoryProductRouter.delete(
  "/:categoryProduct_id",
  categoriesProductsController.delete
);

export default categoryProductRouter;

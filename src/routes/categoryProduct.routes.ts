import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoriesProductsController from "../controllers/CategoriesProductsController";

const categoryProductRouter = Router();
const categoriesProductsController = new CategoriesProductsController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.post("/", categoriesProductsController.create);

export default categoryProductRouter;

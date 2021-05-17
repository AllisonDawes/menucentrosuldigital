import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProductsMenuController from "../controllers/ProductsMenuController";

const productsMenuRouter = Router();
const productsMenuController = new ProductsMenuController();

productsMenuRouter.use(ensureAuthenticated);

productsMenuRouter.get("/", productsMenuController.index);
productsMenuRouter.post("/", productsMenuController.create);

export default productsMenuRouter;

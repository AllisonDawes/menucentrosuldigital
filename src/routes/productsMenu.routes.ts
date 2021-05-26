import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProductsMenuController from "../controllers/ProductsMenuController";

const productsMenuRouter = Router();
const productsMenuController = new ProductsMenuController();

productsMenuRouter.use(ensureAuthenticated);

productsMenuRouter.get("/client", productsMenuController.index);
productsMenuRouter.get("/enterprise", productsMenuController.show);
productsMenuRouter.post("/", productsMenuController.create);
productsMenuRouter.put("/:product_id", productsMenuController.update);
productsMenuRouter.delete("/:product_id", productsMenuController.delete);

export default productsMenuRouter;

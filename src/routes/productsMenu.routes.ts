import { Router } from "express";
import multer from "multer";

import uploadProducts from "../config/uploadProducts";
const upload = multer(uploadProducts);

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProductsMenuController from "../controllers/ProductsMenuController";
import AvatarProductController from "../controllers/AvatarProductController";
import FindAllProductsByMenuIdController from "../controllers/FindAllProductsByMenuIdController";

const productsMenuRouter = Router();
const productsMenuController = new ProductsMenuController();
const avatarProductController = new AvatarProductController();
const findAllProductsByMenuIdController =
  new FindAllProductsByMenuIdController();

productsMenuRouter.get(
  "/:menu_id/all_products",
  findAllProductsByMenuIdController.index
);

productsMenuRouter.get("/client", productsMenuController.index);

productsMenuRouter.use(ensureAuthenticated);

productsMenuRouter.get("/enterprise", productsMenuController.show);
productsMenuRouter.post("/", productsMenuController.create);
productsMenuRouter.put("/:product_id", productsMenuController.update);

productsMenuRouter.patch(
  "/avatar_products/:menu_id/products/:product_id",
  upload.single("product_avatar"),
  avatarProductController.update
);

productsMenuRouter.delete("/:product_id", productsMenuController.delete);

export default productsMenuRouter;

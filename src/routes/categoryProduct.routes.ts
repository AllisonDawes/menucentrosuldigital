import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoriesProductsController from "../controllers/CategoriesProductsController";
import UpdateAvatarCategoryProductsController from "../controllers/UpdateAvatarCategoryProductsController";

import uploadCategories from "../config/uploadCategories";
const upload = multer(uploadCategories);

const categoryProductRouter = Router();
const categoriesProductsController = new CategoriesProductsController();
const updateAvatarCategoryProductsController =
  new UpdateAvatarCategoryProductsController();

categoryProductRouter.get("/", categoriesProductsController.index);

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.post("/", categoriesProductsController.create);

categoryProductRouter.put(
  "/:categoryProduct_id",
  categoriesProductsController.update
);
categoryProductRouter.delete(
  "/:categoryProduct_id",
  categoriesProductsController.delete
);

categoryProductRouter.patch(
  "/avatar_category/:category_product_id",
  upload.single("category_avatar"),
  updateAvatarCategoryProductsController.update
);

export default categoryProductRouter;

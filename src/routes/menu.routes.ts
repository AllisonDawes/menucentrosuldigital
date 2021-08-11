import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuController from "../controllers/MenuController";
import BackgroundMenuController from "../controllers/BackgroundMenuController";
import MenuSearchController from "../controllers/MenuSearchController";

import uploadConfig from "../config/upload";

const upload = multer(uploadConfig);

const menuRouter = Router();
const menuController = new MenuController();
const backgroundMenuController = new BackgroundMenuController();
const menuSearchController = new MenuSearchController();

menuRouter.get("/all_menus/client", menuController.index);
menuRouter.get("/:menu_id/menu", menuSearchController.show);
menuRouter.get("/search_menus", menuSearchController.index);

menuRouter.use(ensureAuthenticated);

menuRouter.get("/", menuController.show);
menuRouter.post("/", menuController.create);

menuRouter.patch(
  "/avatar_menu/:menu_id",
  upload.single("menu_avatar"),
  menuController.update
);

menuRouter.patch(
  "/background_menu/:menu_id",
  upload.single("menu_background"),
  backgroundMenuController.update
);

menuRouter.delete("/:city", menuController.delete);

export default menuRouter;

import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuController from "../controllers/MenuController";
import MenuSearchController from "../controllers/MenuSearchController";

const menuRouter = Router();
const menuController = new MenuController();
const menuSearchController = new MenuSearchController();

menuRouter.get("/all_menus/client", menuController.index);

menuRouter.use(ensureAuthenticated);

menuRouter.get("/search_menus", menuSearchController.index);
menuRouter.get("/", menuController.show);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:city", menuController.delete);

export default menuRouter;

import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuController from "../controllers/MenuController";

const menuRouter = Router();
const menuController = new MenuController();

menuRouter.get("/all_menus/client", menuController.index);

menuRouter.use(ensureAuthenticated);

menuRouter.get("/", menuController.show);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:city", menuController.delete);

export default menuRouter;

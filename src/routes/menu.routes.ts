import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuController from "../controllers/MenuController";
import MenuClientDesloggedController from "../controllers/MenuClientDesloggedController";

const menuRouter = Router();
const menuController = new MenuController();
const menuClientDesloggedController = new MenuClientDesloggedController();

menuRouter.get(
  "/all_menus/client_deslogged",
  menuClientDesloggedController.index
);

menuRouter.use(ensureAuthenticated);

menuRouter.get("/all_menus", menuController.index);
menuRouter.get("/", menuController.show);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:city", menuController.delete);

export default menuRouter;

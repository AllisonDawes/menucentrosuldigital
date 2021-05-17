import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuController from "../controllers/MenuController";

const menuRouter = Router();
const menuController = new MenuController();

menuRouter.use(ensureAuthenticated);

menuRouter.get("/:city", menuController.show);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:city", menuController.delete);

export default menuRouter;

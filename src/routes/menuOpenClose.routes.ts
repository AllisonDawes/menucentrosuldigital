import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MenuOpenCloseController from "../controllers/MenuOpenCloseController";

const menuOpenCloseRouter = Router();
const menuOpenCloseController = new MenuOpenCloseController();

menuOpenCloseRouter.get("/", menuOpenCloseController.show);

menuOpenCloseRouter.use(ensureAuthenticated);

menuOpenCloseRouter.post("/", menuOpenCloseController.create);

export default menuOpenCloseRouter;

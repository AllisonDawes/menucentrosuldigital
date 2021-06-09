import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import FavoritesController from "../controllers/FavoritesController";

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.post("/:menu_id", favoritesController.create);

export default favoritesRouter;

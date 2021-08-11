import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import FavoriteController from "../controllers/FavoriteController";

const favoriteRouter = Router();
const favoriteController = new FavoriteController();

favoriteRouter.use(ensureAuthenticated);

favoriteRouter.get("/", favoriteController.index);
favoriteRouter.get("/:menu_id/favorited", favoriteController.show);
favoriteRouter.post("/", favoriteController.create);
favoriteRouter.delete("/:menu_id", favoriteController.delete);

export default favoriteRouter;

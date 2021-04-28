import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryController from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthenticated);

categoryRouter.post("/", categoryController.create);

export default categoryRouter;

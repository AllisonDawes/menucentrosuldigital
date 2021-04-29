import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryController from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get("/", categoryController.index);
categoryRouter.post("/", categoryController.create);
categoryRouter.put("/:category_id", categoryController.update);
categoryRouter.delete("/:category_id", categoryController.delete);

export default categoryRouter;

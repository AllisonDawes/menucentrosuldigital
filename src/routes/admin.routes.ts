import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AccessAdminController from "../controllers/AccessAdminController";

const adminRouter = Router();
const accessAdminController = new AccessAdminController();

adminRouter.use(ensureAuthenticated);

adminRouter.get("/check/:user_id", accessAdminController.index);
adminRouter.get("/", accessAdminController.show);
adminRouter.post("/", accessAdminController.create);
adminRouter.patch("/", accessAdminController.update);
adminRouter.put("/", accessAdminController.remove);

export default adminRouter;

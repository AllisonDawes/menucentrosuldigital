import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/all_profiles", profileController.index);
profileRouter.get("/", profileController.show);
profileRouter.put("/", profileController.update);
profileRouter.delete("/", profileController.delete);

export default profileRouter;

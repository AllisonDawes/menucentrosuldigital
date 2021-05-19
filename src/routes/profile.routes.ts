import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProfileController from "../controllers/ProfileController";
import AdminAccessProfilesController from "../controllers/AdminAccessProfilesController";

const profileRouter = Router();
const profileController = new ProfileController();
const adminAccessProfilesController = new AdminAccessProfilesController();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/all_profiles", profileController.index);
profileRouter.get("/", profileController.show);
profileRouter.put("/", profileController.update);
profileRouter.delete("/", profileController.delete);
profileRouter.delete(
  "/controll_users/:profile_id",
  adminAccessProfilesController.delete
);

export default profileRouter;

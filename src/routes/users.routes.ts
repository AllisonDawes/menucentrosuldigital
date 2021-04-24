import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UsersController from "../controllers/UsersController";
import EnterpriseController from "../controllers/EnterpriseController";

import uploadConfig from "../config/upload";
const upload = multer(uploadConfig);

const usersRouter = Router();
const usersController = new UsersController();
const enterpriseController = new EnterpriseController();

usersRouter.post("/", usersController.create);
usersRouter.post("/enterprises", enterpriseController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  "/avatar_user",
  upload.single("user_avatar"),
  usersController.update
);

export default usersRouter;

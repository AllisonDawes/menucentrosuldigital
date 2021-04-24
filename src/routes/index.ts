import { Router } from "express";

import usersRouter from "./users.routes";
import profileRouter from "./profile.routes";
import sessionRouter from "./session.routes";
import adminRouter from "./admin.routes";
import addressRouter from "./address.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/profiles", profileRouter);
routes.use("/sessions", sessionRouter);
routes.use("/admins", adminRouter);
routes.use("/address", addressRouter);

export default routes;

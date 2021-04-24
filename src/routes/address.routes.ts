import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressController from "../controllers/AddressController";
import ActiveAddressController from "../controllers/ActiveAddressController";

const addressRouter = Router();
const addressController = new AddressController();
const activeAddressController = new ActiveAddressController();

addressRouter.use(ensureAuthenticated);

addressRouter.post("/", addressController.create);
addressRouter.put("/", addressController.update);
addressRouter.patch("/active", activeAddressController.update);

export default addressRouter;

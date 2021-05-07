import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressController from "../controllers/AddressController";
import ActiveAddressController from "../controllers/ActiveAddressController";

const addressRouter = Router();
const addressController = new AddressController();
const activeAddressController = new ActiveAddressController();

addressRouter.use(ensureAuthenticated);

addressRouter.get("/", addressController.index);
addressRouter.get("/active", addressController.show);
addressRouter.post("/", addressController.create);
addressRouter.put("/", addressController.update);
addressRouter.patch("/active", activeAddressController.update);
addressRouter.delete("/:address_id", addressController.delete);

export default addressRouter;

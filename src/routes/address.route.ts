import { Router } from "express";
import auth from "../middleware/auth";
import {
  addAddressController,
  deleteAddresscontroller,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller";

const addressRouter = Router();

addressRouter.post("/create-address", auth, addAddressController);
addressRouter.get("/get-address", auth, getAddressController);
addressRouter.put("/update-address", auth, updateAddressController);
addressRouter.delete("/disable-address", auth, deleteAddresscontroller);

export default addressRouter;

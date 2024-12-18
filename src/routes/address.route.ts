import { Router } from "express";
import auth from "../middleware/auth";
import {
  addAddressController,
  deleteAddresscontroller,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller";
import asyncHandler from "../utils/asyncHandler";

const addressRouter = Router();

addressRouter.post("/create-address", auth, asyncHandler(addAddressController));
addressRouter.get("/get-address", auth, asyncHandler(getAddressController));
addressRouter.put(
  "/update-address",
  auth,
  asyncHandler(updateAddressController)
);
addressRouter.delete(
  "/disable-address",
  auth,
  asyncHandler(deleteAddresscontroller)
);

export default addressRouter;

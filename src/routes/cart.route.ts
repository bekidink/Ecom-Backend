import { Router } from "express";
import auth from "../middleware/auth";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controllers/cartProduct.controller";
import asyncHandler from "../utils/asyncHandler";

const cartRouter = Router();

cartRouter.post("/create-cart", auth, asyncHandler(addToCartItemController));
cartRouter.get("/get-cart", auth, asyncHandler(getCartItemController));
cartRouter.put("/update-qty", auth, asyncHandler(updateCartItemQtyController));
cartRouter.delete("/delete-cart-item", auth, asyncHandler(deleteCartItemQtyController));

export default cartRouter;

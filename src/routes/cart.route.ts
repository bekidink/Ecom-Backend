import { Router } from "express";
import auth from "../middleware/auth";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controllers/cartProduct.controller";

const cartRouter = Router();

cartRouter.post("/create-cart", auth, addToCartItemController);
cartRouter.get("/get-cart", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemQtyController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController);

export default cartRouter;

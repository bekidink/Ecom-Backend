import { Router } from "express";
import auth from "../middleware/auth";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} from "../controllers/order.controller";
import asyncHandler from "../utils/asyncHandler";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, asyncHandler(CashOnDeliveryOrderController));
orderRouter.post("/checkout-order", auth, asyncHandler(paymentController));
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, asyncHandler(getOrderDetailsController));

export default orderRouter;

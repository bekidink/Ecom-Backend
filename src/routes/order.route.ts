import { Router } from "express";
import auth from "../middleware/auth";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.post("/checkout-order", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrderDetailsController);

export default orderRouter;

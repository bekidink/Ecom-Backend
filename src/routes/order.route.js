"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post("/cash-on-delivery", auth_1.default, order_controller_1.CashOnDeliveryOrderController);
orderRouter.post("/checkout-order", auth_1.default, order_controller_1.paymentController);
orderRouter.post("/webhook", order_controller_1.webhookStripe);
orderRouter.get("/order-list", auth_1.default, order_controller_1.getOrderDetailsController);
exports.default = orderRouter;

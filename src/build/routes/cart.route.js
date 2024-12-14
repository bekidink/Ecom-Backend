"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const cartProduct_controller_1 = require("../controllers/cartProduct.controller");
const cartRouter = (0, express_1.Router)();
cartRouter.post("/create-cart", auth_1.default, cartProduct_controller_1.addToCartItemController);
cartRouter.get("/get-cart", auth_1.default, cartProduct_controller_1.getCartItemController);
cartRouter.put("/update-qty", auth_1.default, cartProduct_controller_1.updateCartItemQtyController);
cartRouter.delete("/delete-cart-item", auth_1.default, cartProduct_controller_1.deleteCartItemQtyController);
exports.default = cartRouter;

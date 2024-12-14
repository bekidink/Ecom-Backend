"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const address_controller_1 = require("../controllers/address.controller");
const addressRouter = (0, express_1.Router)();
addressRouter.post("/create-address", auth_1.default, address_controller_1.addAddressController);
addressRouter.get("/get-address", auth_1.default, address_controller_1.getAddressController);
addressRouter.put("/update-address", auth_1.default, address_controller_1.updateAddressController);
addressRouter.delete("/disable-address", auth_1.default, address_controller_1.deleteAddresscontroller);
exports.default = addressRouter;

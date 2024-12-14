"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const product_controller_1 = require("../controllers/product.controller");
const admin_1 = require("../middleware/admin");
const productRouter = (0, express_1.Router)();
productRouter.post("/create-product", auth_1.default, product_controller_1.createProductController);
productRouter.post("/get-product", product_controller_1.getProductController);
productRouter.post("/get-product-by-category", product_controller_1.getProductByCategory);
productRouter.post("/get-pruduct-by-category-and-subcategory", product_controller_1.getProductByCategoryAndSubCategory);
productRouter.post("/get-product-details", product_controller_1.getProductDetails);
//update product
productRouter.put("/update-product-details", auth_1.default, admin_1.admin, product_controller_1.updateProductDetails);
//delete product
productRouter.delete("/delete-product", auth_1.default, admin_1.admin, product_controller_1.deleteProductDetails);
//search product
productRouter.post("/search-product", product_controller_1.searchProduct);
exports.default = productRouter;

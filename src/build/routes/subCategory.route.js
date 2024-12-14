"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const subCategory_controller_1 = require("../controllers/subCategory.controller");
const subCategoryRouter = (0, express_1.Router)();
subCategoryRouter.post("/create-subCategory", auth_1.default, subCategory_controller_1.AddSubCategoryController);
subCategoryRouter.post("/get-subCategory", subCategory_controller_1.getSubCategoryController);
subCategoryRouter.put("/update-subCategory", auth_1.default, subCategory_controller_1.updateSubCategoryController);
subCategoryRouter.delete("/delete-subCategory", auth_1.default, subCategory_controller_1.deleteSubCategoryController);
exports.default = subCategoryRouter;

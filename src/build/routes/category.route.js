"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const category_controller_1 = require("../controllers/category.controller");
const categoryRouter = express_1.default.Router();
categoryRouter.post("/add-category", auth_1.default, category_controller_1.AddCategoryController);
categoryRouter.get("/get-category", category_controller_1.getCategoryController);
categoryRouter.put("/update-category", auth_1.default, category_controller_1.updateCategoryController);
categoryRouter.delete("/delete-category", auth_1.default, category_controller_1.deleteCategoryController);
exports.default = categoryRouter;

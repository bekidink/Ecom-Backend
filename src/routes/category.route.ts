import express from "express";
import auth from "../middleware/auth";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller";
import asyncHandler from "../utils/asyncHandler";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", auth, asyncHandler(AddCategoryController));
categoryRouter.get("/get-category", asyncHandler(getCategoryController));
categoryRouter.put("/update-category", auth,asyncHandler( updateCategoryController));
categoryRouter.delete("/delete-category", auth, asyncHandler(deleteCategoryController));

export default categoryRouter;

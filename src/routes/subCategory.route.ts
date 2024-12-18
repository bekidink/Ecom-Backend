import { Router } from "express";
import auth from "../middleware/auth";
import {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller";
import asyncHandler from "../utils/asyncHandler";

const subCategoryRouter = Router();

subCategoryRouter.post("/create-subCategory", auth, asyncHandler(AddSubCategoryController));
subCategoryRouter.post("/get-subCategory", asyncHandler(getSubCategoryController));
subCategoryRouter.put("/update-subCategory", auth, asyncHandler(updateSubCategoryController));
subCategoryRouter.delete("/delete-subCategory", auth, asyncHandler(deleteSubCategoryController));

export default subCategoryRouter;

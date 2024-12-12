import { Router } from "express";
import auth from "../middleware/auth";
import {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller";

const subCategoryRouter = Router();

subCategoryRouter.post("/create-subCategory", auth, AddSubCategoryController);
subCategoryRouter.post("/get-subCategory", getSubCategoryController);
subCategoryRouter.put("/update-subCategory", auth, updateSubCategoryController);
subCategoryRouter.delete("/delete-subCategory", auth, deleteSubCategoryController);

export default subCategoryRouter;

import express from "express";
import auth from "../middleware/auth";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", auth, AddCategoryController);
categoryRouter.get("/get-category", getCategoryController);
categoryRouter.put("/update-category", auth, updateCategoryController);
categoryRouter.delete("/delete-category", auth, deleteCategoryController);

export default categoryRouter;

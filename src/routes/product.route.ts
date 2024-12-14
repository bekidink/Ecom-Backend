import { Router } from "express";
import auth from "../middleware/auth";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} from "../controllers/product.controller";
import { admin } from "../middleware/admin";

const productRouter = Router();

productRouter.post("/create-product", auth,  createProductController);
productRouter.post("/get-product", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);

//update product
productRouter.put("/update-product-details", auth, admin, updateProductDetails);

//delete product
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);

//search product
productRouter.post("/search-product", searchProduct);

export default productRouter;

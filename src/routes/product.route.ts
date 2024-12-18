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
import asyncHandler from "../utils/asyncHandler";

const productRouter = Router();

productRouter.post("/create-product", auth,  asyncHandler(createProductController));
productRouter.post("/get-product", asyncHandler(getProductController));
productRouter.post("/get-product-by-category", asyncHandler(getProductByCategory));
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
asyncHandler(  getProductByCategoryAndSubCategory
));
productRouter.post("/get-product-details",asyncHandler( getProductDetails));

//update product
productRouter.put("/update-product-details", auth, admin,asyncHandler( updateProductDetails));

//delete product
productRouter.delete("/delete-product", auth, admin,asyncHandler( deleteProductDetails));

//search product
productRouter.post("/search-product",asyncHandler( searchProduct));

export default productRouter;

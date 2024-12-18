import { Router } from "express";
import auth from "../middleware/auth";
import uploadImageController from "../controllers/uploadImage.controller";
import upload from "../middleware/multer";
import asyncHandler from "../utils/asyncHandler";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  auth,
  upload.single("image"),
  asyncHandler(uploadImageController)
);

export default uploadRouter;

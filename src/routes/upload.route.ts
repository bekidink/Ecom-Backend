import { Router } from "express";
import auth from "../middleware/auth";
import uploadImageController from "../controllers/uploadImage.controller";
import upload from "../middleware/multer";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  auth,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;

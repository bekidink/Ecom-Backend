import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from "../controllers/user.controller";
import auth from "../middleware/auth";
import upload from "../middleware/multer";
import asyncHandler from "../utils/asyncHandler";

const userRouter = Router();

userRouter.post("/register", asyncHandler(registerUserController));
userRouter.post("/verify-email",asyncHandler( verifyEmailController));
userRouter.post("/login",asyncHandler( loginController));
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetpassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);

export default userRouter;

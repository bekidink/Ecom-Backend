import UserModel from "../models/user.model";
import e, { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./auth";

export const admin = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId);

    if (user?.role !== "ADMIN") {
      return response.status(400).json({
        message: "Permission denial",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return response.status(500).json({
      message: "Permission denial",
      error: true,
      success: false,
    });
  }
});

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const auth = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
      });
    }

    const decode = await jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN!
    );

    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    const userId = (decode as JwtPayload)._id;
    request.userId = userId;

    next();
  }
);

export default auth;

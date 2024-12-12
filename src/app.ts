require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import uploadRouter from "./routes/upload.route";
import subCategoryRouter from "./routes/subCategory.route";
import productRouter from "./routes/product.route";
import cartRouter from "./routes/cart.route";
import addressRouter from "./routes/address.route";
import orderRouter from "./routes/order.route";
app.use(express.json());
app.use(cookieParser());
// app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://192.168.43.97:3000",
  })
);
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  categoryRouter,
  uploadRouter,
  subCategoryRouter,
  productRouter,
  cartRouter,
  addressRouter
);

app.use(
  cors({
    origin: "http://localhost:3000", // Allow this specific origin
    credentials: true, // Enable credentials
  })
);
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
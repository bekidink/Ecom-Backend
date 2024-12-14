"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const subCategory_route_1 = __importDefault(require("./routes/subCategory.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const address_route_1 = __importDefault(require("./routes/address.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// app.use(morgan());
exports.app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
exports.app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://192.168.43.97:3000",
}));
exports.app.use("/api/v1", user_route_1.default, order_route_1.default, category_route_1.default, upload_route_1.default, subCategory_route_1.default, product_route_1.default, cart_route_1.default, address_route_1.default);
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Allow this specific origin
    credentials: true, // Enable credentials
}));
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        succcess: true,
        message: "API is working",
    });
});
// unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});

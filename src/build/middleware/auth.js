"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
const auth = (0, exports.asyncHandler)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = request.cookies.accessToken ||
        ((_b = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]);
    if (!token) {
        return response.status(401).json({
            message: "Provide token",
        });
    }
    const decode = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
        return response.status(401).json({
            message: "Unauthorized access",
            error: true,
            success: false,
        });
    }
    const userId = decode._id;
    request.userId = userId;
    next();
}));
exports.default = auth;

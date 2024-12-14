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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
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
                message: "unauthorized access",
                error: true,
                success: false,
            });
        }
        request.userId = decode === null || decode === void 0 ? void 0 : decode.id;
        next();
    }
    catch (error) {
        return response.status(500).json({
            message: "You have not login", ///error.message || error,
            error: true,
            success: false,
        });
    }
});
exports.default = auth;

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
exports.admin = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_1 = require("./auth");
exports.admin = (0, auth_1.asyncHandler)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId;
        const user = yield user_model_1.default.findById(userId);
        if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
            return response.status(400).json({
                message: "Permission denial",
                error: true,
                success: false,
            });
        }
        next();
    }
    catch (error) {
        return response.status(500).json({
            message: "Permission denial",
            error: true,
            success: false,
        });
    }
}));

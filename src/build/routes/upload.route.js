"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const uploadImage_controller_1 = __importDefault(require("../controllers/uploadImage.controller"));
const multer_1 = __importDefault(require("../middleware/multer"));
const uploadRouter = (0, express_1.Router)();
uploadRouter.post("/upload", auth_1.default, multer_1.default.single("image"), uploadImage_controller_1.default);
exports.default = uploadRouter;

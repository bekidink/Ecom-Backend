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
const uploadImageClodinary_1 = __importDefault(require("../utils/uploadImageClodinary"));
const uploadImageController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = request.file;
        const uploadImage = yield (0, uploadImageClodinary_1.default)(file);
        return response.json({
            message: "Upload done",
            data: uploadImage,
            success: true,
            error: false,
        });
    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
});
exports.default = uploadImageController;

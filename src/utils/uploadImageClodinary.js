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
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET_KEY,
});
const uploadImageClodinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = (image === null || image === void 0 ? void 0 : image.buffer) || Buffer.from(yield image.arrayBuffer());
    const uploadImage = yield new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
            return resolve(uploadResult);
        })
            .end(buffer);
    });
    return uploadImage;
});
exports.default = uploadImageClodinary;

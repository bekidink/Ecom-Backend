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
exports.deleteSubCategoryController = exports.updateSubCategoryController = exports.getSubCategoryController = exports.AddSubCategoryController = void 0;
const subCategory_model_1 = __importDefault(require("../models/subCategory.model"));
const AddSubCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, category } = request.body;
        if (!name && !image && !category[0]) {
            return response.status(400).json({
                message: "Provide name, image, category",
                error: true,
                success: false,
            });
        }
        const payload = {
            name,
            image,
            category,
        };
        const createSubCategory = new subCategory_model_1.default(payload);
        const save = yield createSubCategory.save();
        return response.json({
            message: "Sub Category Created",
            data: save,
            error: false,
            success: true,
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
exports.AddSubCategoryController = AddSubCategoryController;
const getSubCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield subCategory_model_1.default.find()
            .sort({ createdAt: -1 })
            .populate("category");
        return response.json({
            message: "Sub Category data",
            data: data,
            error: false,
            success: true,
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
exports.getSubCategoryController = getSubCategoryController;
const updateSubCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, image, category } = request.body;
        const checkSub = yield subCategory_model_1.default.findById(_id);
        if (!checkSub) {
            return response.status(400).json({
                message: "Check your _id",
                error: true,
                success: false,
            });
        }
        const updateSubCategory = yield subCategory_model_1.default.findByIdAndUpdate(_id, {
            name,
            image,
            category,
        });
        return response.json({
            message: "Updated Successfully",
            data: updateSubCategory,
            error: false,
            success: true,
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
exports.updateSubCategoryController = updateSubCategoryController;
const deleteSubCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = request.body;
        console.log("Id", _id);
        const deleteSub = yield subCategory_model_1.default.findByIdAndDelete(_id);
        return response.json({
            message: "Delete successfully",
            data: deleteSub,
            error: false,
            success: true,
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
exports.deleteSubCategoryController = deleteSubCategoryController;

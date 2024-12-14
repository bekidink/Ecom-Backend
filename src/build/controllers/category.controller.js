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
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoryController = exports.AddCategoryController = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const subCategory_model_1 = __importDefault(require("../models/subCategory.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const AddCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = request.body;
        if (!name || !image) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false,
            });
        }
        const addCategory = new category_model_1.default({
            name,
            image,
        });
        const saveCategory = yield addCategory.save();
        if (!saveCategory) {
            return response.status(500).json({
                message: "Not Created",
                error: true,
                success: false,
            });
        }
        return response.json({
            message: "Add Category",
            data: saveCategory,
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
exports.AddCategoryController = AddCategoryController;
const getCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield category_model_1.default.find().sort({ createdAt: -1 });
        return response.json({
            data: data,
            error: false,
            success: true,
        });
    }
    catch (error) {
        return response.status(500).json({
            message: error.messsage || error,
            error: true,
            success: false,
        });
    }
});
exports.getCategoryController = getCategoryController;
const updateCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, image } = request.body;
        const update = yield category_model_1.default.updateOne({
            _id: _id,
        }, {
            name,
            image,
        });
        return response.json({
            message: "Updated Category",
            success: true,
            error: false,
            data: update,
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
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = request.body;
        const checkSubCategory = yield subCategory_model_1.default.find({
            category: {
                $in: [_id],
            },
        }).countDocuments();
        const checkProduct = yield product_model_1.default.find({
            category: {
                $in: [_id],
            },
        }).countDocuments();
        if (checkSubCategory > 0 || checkProduct > 0) {
            return response.status(400).json({
                message: "Category is already use can't delete",
                error: true,
                success: false,
            });
        }
        const deleteCategory = yield category_model_1.default.deleteOne({ _id: _id });
        return response.json({
            message: "Delete category successfully",
            data: deleteCategory,
            error: false,
            success: true,
        });
    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }
});
exports.deleteCategoryController = deleteCategoryController;

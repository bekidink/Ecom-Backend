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
exports.searchProduct = exports.deleteProductDetails = exports.updateProductDetails = exports.getProductDetails = exports.getProductByCategoryAndSubCategory = exports.getProductByCategory = exports.getProductController = exports.createProductController = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProductController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details, } = request.body;
        if (!name ||
            !image[0] ||
            !category[0] ||
            !subCategory[0] ||
            !unit ||
            !price ||
            !description) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false,
            });
        }
        const product = new product_model_1.default({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        });
        const saveProduct = yield product.save();
        return response.json({
            message: "Product Created Successfully",
            data: saveProduct,
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
exports.createProductController = createProductController;
const getProductController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, limit, search } = request.body;
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const query = search
            ? {
                $text: {
                    $search: search,
                },
            }
            : {};
        const skip = (page - 1) * limit;
        const [data, totalCount] = yield Promise.all([
            product_model_1.default.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("category subCategory"),
            product_model_1.default.countDocuments(query),
        ]);
        return response.json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data,
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
exports.getProductController = getProductController;
const getProductByCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.body;
        if (!id) {
            return response.status(400).json({
                message: "provide category id",
                error: true,
                success: false,
            });
        }
        const product = yield product_model_1.default.find({
            category: { $in: id },
        }).limit(15);
        return response.json({
            message: "category product list",
            data: product,
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
exports.getProductByCategory = getProductByCategory;
const getProductByCategoryAndSubCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, subCategoryId, page, limit } = request.body;
        if (!categoryId || !subCategoryId) {
            return response.status(400).json({
                message: "Provide categoryId and subCategoryId",
                error: true,
                success: false,
            });
        }
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId },
        };
        const skip = (page - 1) * limit;
        const [data, dataCount] = yield Promise.all([
            product_model_1.default.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            product_model_1.default.countDocuments(query),
        ]);
        return response.json({
            message: "Product list",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
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
exports.getProductByCategoryAndSubCategory = getProductByCategoryAndSubCategory;
const getProductDetails = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = request.body;
        const product = yield product_model_1.default.findOne({ _id: productId });
        return response.json({
            message: "product details",
            data: product,
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
exports.getProductDetails = getProductDetails;
//update product
const updateProductDetails = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = request.body;
        if (!_id) {
            return response.status(400).json({
                message: "provide product _id",
                error: true,
                success: false,
            });
        }
        const updateProduct = yield product_model_1.default.updateOne({ _id: _id }, Object.assign({}, request.body));
        return response.json({
            message: "updated successfully",
            data: updateProduct,
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
exports.updateProductDetails = updateProductDetails;
//delete product
const deleteProductDetails = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = request.body;
        if (!_id) {
            return response.status(400).json({
                message: "provide _id ",
                error: true,
                success: false,
            });
        }
        const deleteProduct = yield product_model_1.default.deleteOne({ _id: _id });
        return response.json({
            message: "Delete successfully",
            error: false,
            success: true,
            data: deleteProduct,
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
exports.deleteProductDetails = deleteProductDetails;
//search product
const searchProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, page, limit } = request.body;
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const query = search
            ? {
                $text: {
                    $search: search,
                },
            }
            : {};
        const skip = (page - 1) * limit;
        const [data, dataCount] = yield Promise.all([
            product_model_1.default.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("category subCategory"),
            product_model_1.default.countDocuments(query),
        ]);
        return response.json({
            message: "Product data",
            error: false,
            success: true,
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
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
exports.searchProduct = searchProduct;

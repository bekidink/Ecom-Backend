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
exports.deleteCartItemQtyController = exports.updateCartItemQtyController = exports.getCartItemController = exports.addToCartItemController = void 0;
const cartProduct_model_1 = __importDefault(require("../models/cartProduct.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addToCartItemController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId;
        const { productId } = request.body;
        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false,
            });
        }
        const checkItemCart = yield cartProduct_model_1.default.findOne({
            userId: userId,
            productId: productId,
        });
        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart",
            });
        }
        const cartItem = new cartProduct_model_1.default({
            quantity: 1,
            userId: userId,
            productId: productId,
        });
        const save = yield cartItem.save();
        const updateCartUser = yield user_model_1.default.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId,
            },
        });
        return response.json({
            data: save,
            message: "Item add successfully",
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
exports.addToCartItemController = addToCartItemController;
const getCartItemController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId;
        const cartItem = yield cartProduct_model_1.default.find({
            userId: userId,
        }).populate("productId");
        return response.json({
            data: cartItem,
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
exports.getCartItemController = getCartItemController;
const updateCartItemQtyController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId;
        const { _id, qty } = request.body;
        if (!_id || !qty) {
            return response.status(400).json({
                message: "provide _id, qty",
            });
        }
        const updateCartitem = yield cartProduct_model_1.default.updateOne({
            _id: _id,
            userId: userId,
        }, {
            quantity: qty,
        });
        return response.json({
            message: "Update cart",
            success: true,
            error: false,
            data: updateCartitem,
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
exports.updateCartItemQtyController = updateCartItemQtyController;
const deleteCartItemQtyController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId; // middleware
        const { _id } = request.body;
        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false,
            });
        }
        const deleteCartItem = yield cartProduct_model_1.default.deleteOne({
            _id: _id,
            userId: userId,
        });
        return response.json({
            message: "Item remove",
            error: false,
            success: true,
            data: deleteCartItem,
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
exports.deleteCartItemQtyController = deleteCartItemQtyController;

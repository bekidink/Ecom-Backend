"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: [],
    },
    category: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "category",
        },
    ],
    subCategory: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "subCategory",
        },
    ],
    unit: {
        type: String,
        default: "",
    },
    stock: {
        type: Number,
        default: null,
    },
    price: {
        type: Number,
        defualt: null,
    },
    discount: {
        type: Number,
        default: null,
    },
    description: {
        type: String,
        default: "",
    },
    more_details: {
        type: Object,
        default: {},
    },
    publish: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
//create a text index
productSchema.index({
    name: "text",
    description: "text",
}, {
    name: "10",
    // description: true,
});
const ProductModel = mongoose_1.default.model("product", productSchema);
exports.default = ProductModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressSchema = new mongoose_1.default.Schema({
    address_line: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    pincode: {
        type: String,
    },
    country: {
        type: String,
    },
    mobile: {
        type: Number,
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: "",
    },
}, {
    timestamps: true,
});
const AddressModel = mongoose_1.default.model("address", addressSchema);
exports.default = AddressModel;

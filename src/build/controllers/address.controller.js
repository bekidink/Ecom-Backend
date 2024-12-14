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
exports.deleteAddresscontroller = exports.updateAddressController = exports.getAddressController = exports.addAddressController = void 0;
const address_model_1 = __importDefault(require("../models/address.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addAddressController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId; // middleware
        const { address_line, city, state, pincode, country, mobile } = request.body;
        const createAddress = new address_model_1.default({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId: userId,
        });
        const saveAddress = yield createAddress.save();
        const addUserAddressId = yield user_model_1.default.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id,
            },
        });
        return response.json({
            message: "Address Created Successfully",
            error: false,
            success: true,
            data: saveAddress,
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
exports.addAddressController = addAddressController;
const getAddressController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId; // middleware auth
        const data = yield address_model_1.default.find({ userId: userId }).sort({
            createdAt: -1,
        });
        return response.json({
            data: data,
            message: "List of address",
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
exports.getAddressController = getAddressController;
const updateAddressController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId; // middleware auth
        const { _id, address_line, city, state, country, pincode, mobile } = request.body;
        const updateAddress = yield address_model_1.default.updateOne({ _id: _id, userId: userId }, {
            address_line,
            city,
            state,
            country,
            mobile,
            pincode,
        });
        return response.json({
            message: "Address Updated",
            error: false,
            success: true,
            data: updateAddress,
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
exports.updateAddressController = updateAddressController;
const deleteAddresscontroller = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.userId; // auth middleware
        const { _id } = request.body;
        const disableAddress = yield address_model_1.default.updateOne({ _id: _id, userId }, {
            status: false,
        });
        return response.json({
            message: "Address remove",
            error: false,
            success: true,
            data: disableAddress,
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
exports.deleteAddresscontroller = deleteAddresscontroller;

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
exports.pricewithDiscount = void 0;
exports.CashOnDeliveryOrderController = CashOnDeliveryOrderController;
exports.paymentController = paymentController;
exports.webhookStripe = webhookStripe;
exports.getOrderDetailsController = getOrderDetailsController;
const stripe_1 = __importDefault(require("../config/stripe"));
const cartProduct_model_1 = __importDefault(require("../models/cartProduct.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// import Stripe from "stripe";
function CashOnDeliveryOrderController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId; // auth middleware
            const { list_items, totalAmt, addressId, subTotalAmt } = request.body;
            const payload = list_items.map((el) => {
                return {
                    userId: userId,
                    orderId: `ORD-${new mongoose_1.default.Types.ObjectId()}`,
                    productId: el.productId._id,
                    product_details: {
                        name: el.productId.name,
                        image: el.productId.image,
                    },
                    paymentId: "",
                    payment_status: "CASH ON DELIVERY",
                    delivery_address: addressId,
                    subTotalAmt: subTotalAmt,
                    totalAmt: totalAmt,
                };
            });
            const generatedOrder = yield order_model_1.default.insertMany(payload);
            ///remove from the cart
            const removeCartItems = yield cartProduct_model_1.default.deleteMany({
                userId: userId,
            });
            const updateInUser = yield user_model_1.default.updateOne({ _id: userId }, { shopping_cart: [] });
            return response.json({
                message: "Order successfully",
                error: false,
                success: true,
                data: generatedOrder,
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
}
const pricewithDiscount = (price, dis = 1) => {
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100);
    const actualPrice = Number(price) - Number(discountAmout);
    return actualPrice;
};
exports.pricewithDiscount = pricewithDiscount;
function paymentController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId; // auth middleware
            const { list_items, totalAmt, addressId, subTotalAmt } = request.body;
            const user = yield user_model_1.default.findById(userId);
            const line_items = list_items.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productId.name,
                            images: item.productId.image,
                            metadata: {
                                productId: item.productId._id,
                            },
                        },
                        unit_amount: (0, exports.pricewithDiscount)(item.productId.price, item.productId.discount) *
                            100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            });
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                customer_email: user === null || user === void 0 ? void 0 : user.email,
                metadata: {
                    userId: userId,
                    addressId: addressId,
                },
                line_items: line_items,
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            };
            const session = yield stripe_1.default.checkout.sessions.create(params);
            return response.status(200).json(session);
        }
        catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false,
            });
        }
    });
}
const getOrderProductItems = (_a) => __awaiter(void 0, [_a], void 0, function* ({ lineItems, userId, addressId, paymentId, payment_status, }) {
    var _b;
    const productList = [];
    if ((_b = lineItems === null || lineItems === void 0 ? void 0 : lineItems.data) === null || _b === void 0 ? void 0 : _b.length) {
        for (const item of lineItems.data) {
            const product = yield stripe_1.default.products.retrieve(item.price.product);
            const paylod = {
                userId: userId,
                orderId: `ORD-${new mongoose_1.default.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_details: {
                    name: product.name,
                    image: product.images,
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_address: addressId,
                subTotalAmt: Number(item.amount_total / 100),
                totalAmt: Number(item.amount_total / 100),
            };
            productList.push(paylod);
        }
    }
    return productList;
});
//http://localhost:8080/api/order/webhook
function webhookStripe(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = request.body;
        const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY;
        console.log("event", event);
        // Handle the event
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                const lineItems = yield stripe_1.default.checkout.sessions.listLineItems(session.id);
                const userId = session.metadata.userId;
                const orderProduct = yield getOrderProductItems({
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.payment_intent,
                    payment_status: session.payment_status,
                });
                const order = yield order_model_1.default.insertMany(orderProduct);
                console.log(order);
                if (Boolean(order[0])) {
                    const removeCartItems = yield user_model_1.default.findByIdAndUpdate(userId, {
                        shopping_cart: [],
                    });
                    const removeCartProductDB = yield cartProduct_model_1.default.deleteMany({
                        userId: userId,
                    });
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        // Return a response to acknowledge receipt of the event
        response.json({ received: true });
    });
}
function getOrderDetailsController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId; // order id
            const orderlist = yield order_model_1.default.find({ userId: userId })
                .sort({ createdAt: -1 })
                .populate("delivery_address");
            return response.json({
                message: "order list",
                data: orderlist,
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
}

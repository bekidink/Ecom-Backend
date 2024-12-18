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
exports.registerUserController = registerUserController;
exports.verifyEmailController = verifyEmailController;
exports.loginController = loginController;
exports.logoutController = logoutController;
exports.uploadAvatar = uploadAvatar;
exports.updateUserDetails = updateUserDetails;
exports.forgotPasswordController = forgotPasswordController;
exports.verifyForgotPasswordOtp = verifyForgotPasswordOtp;
exports.resetpassword = resetpassword;
exports.refreshToken = refreshToken;
exports.userDetails = userDetails;
const sendEmail_1 = __importDefault(require("../config/sendEmail"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verifyEmailTemplate_1 = __importDefault(require("../utils/verifyEmailTemplate"));
const generateAccessToken_1 = __importDefault(require("../utils/generateAccessToken"));
const generatedRefreshToken_1 = __importDefault(require("../utils/generatedRefreshToken"));
const uploadImageClodinary_1 = __importDefault(require("../utils/uploadImageClodinary"));
const generatedOtp_1 = __importDefault(require("../utils/generatedOtp"));
const forgetPasswordTemplate_1 = __importDefault(require("../utils/forgetPasswordTemplate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUserController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = request.body;
            if (!name || !email || !password) {
                return response.status(400).json({
                    message: "provide email, name, password",
                    error: true,
                    success: false,
                });
            }
            const user = yield user_model_1.default.findOne({ email });
            if (user) {
                return response.json({
                    message: "Already register email",
                    error: true,
                    success: false,
                });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashPassword = yield bcryptjs_1.default.hash(password, salt);
            const payload = {
                name,
                email,
                password: hashPassword,
            };
            const newUser = new user_model_1.default(payload);
            const save = yield newUser.save();
            const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save === null || save === void 0 ? void 0 : save._id}`;
            const verifyEmail = yield (0, sendEmail_1.default)({
                sendTo: email,
                subject: "Verify email from binkeyit",
                html: (0, verifyEmailTemplate_1.default)({
                    name,
                    url: VerifyEmailUrl,
                }),
            });
            return response.json({
                message: "User register successfully",
                error: false,
                success: true,
                data: save,
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
function verifyEmailController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = request.body;
            const user = yield user_model_1.default.findOne({ _id: code });
            if (!user) {
                return response.status(400).json({
                    message: "Invalid code",
                    error: true,
                    success: false,
                });
            }
            const updateUser = yield user_model_1.default.updateOne({ _id: code }, {
                verify_email: true,
            });
            return response.json({
                message: "Verify email done",
                success: true,
                error: false,
            });
        }
        catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: true,
            });
        }
    });
}
//login controller
function loginController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            if (!email || !password) {
                return response.status(400).json({
                    message: "provide email, password",
                    error: true,
                    success: false,
                });
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return response.status(400).json({
                    message: "User not register",
                    error: true,
                    success: false,
                });
            }
            if (user.status !== "Active") {
                return response.status(400).json({
                    message: "Contact to Admin",
                    error: true,
                    success: false,
                });
            }
            const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!checkPassword) {
                return response.status(400).json({
                    message: "Check your password",
                    error: true,
                    success: false,
                });
            }
            const accesstoken = yield (0, generateAccessToken_1.default)(user._id);
            const refreshToken = yield (0, generatedRefreshToken_1.default)(user._id);
            const updateUser = yield user_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                last_login_date: new Date(),
            });
            const cookiesOption = {
                httpOnly: true,
                secure: true,
                // sameSite: "None",
            };
            response.cookie("accessToken", accesstoken, cookiesOption);
            response.cookie("refreshToken", refreshToken, cookiesOption);
            return response.json({
                message: "Login successfully",
                error: false,
                success: true,
                data: {
                    accesstoken,
                    refreshToken,
                },
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
//logout controller
function logoutController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userid = request.userId; //middleware
            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            };
            response.clearCookie("accessToken", cookiesOption);
            response.clearCookie("refreshToken", cookiesOption);
            const removeRefreshToken = yield user_model_1.default.findByIdAndUpdate(userid, {
                refresh_token: "",
            });
            return response.json({
                message: "Logout successfully",
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
//upload user avatar
function uploadAvatar(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId; // auth middlware
            const image = request.file; // multer middleware
            const upload = yield (0, uploadImageClodinary_1.default)(image);
            const updateUser = yield user_model_1.default.findByIdAndUpdate(userId, {
                avatar: upload.url,
            });
            return response.json({
                message: "upload profile",
                success: true,
                error: false,
                data: {
                    _id: userId,
                    avatar: upload.url,
                },
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
//update user details
function updateUserDetails(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId; //auth middleware
            const { name, email, mobile, password } = request.body;
            let hashPassword = "";
            if (password) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                hashPassword = yield bcryptjs_1.default.hash(password, salt);
            }
            const updateUser = yield user_model_1.default.updateOne({ _id: userId }, Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: name })), (email && { email: email })), (mobile && { mobile: mobile })), (password && { password: hashPassword })));
            return response.json({
                message: "Updated successfully",
                error: false,
                success: true,
                data: updateUser,
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
//forgot password not login
function forgotPasswordController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = request.body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return response.status(400).json({
                    message: "Email not available",
                    error: true,
                    success: false,
                });
            }
            const otp = (0, generatedOtp_1.default)();
            const expireTime = new Date();
            expireTime.setTime(expireTime.getTime() + 60 * 60 * 1000); // Adding 1 hour (in milliseconds)
            // 1hr
            const update = yield user_model_1.default.findByIdAndUpdate(user._id, {
                forgot_password_otp: otp,
                forgot_password_expiry: new Date(expireTime).toISOString(),
            });
            yield (0, sendEmail_1.default)({
                sendTo: email,
                subject: "Forgot password from Binkeyit",
                html: (0, forgetPasswordTemplate_1.default)({
                    name: user.name,
                    otp: otp,
                }),
            });
            return response.json({
                message: "check your email",
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
//verify forgot password otp
function verifyForgotPasswordOtp(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, otp } = request.body;
            if (!email || !otp) {
                return response.status(400).json({
                    message: "Provide required field email, otp.",
                    error: true,
                    success: false,
                });
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return response.status(400).json({
                    message: "Email not available",
                    error: true,
                    success: false,
                });
            }
            const currentTime = new Date();
            if (user.forgot_password_expiry < currentTime) {
                return response.status(400).json({
                    message: "Otp is expired",
                    error: true,
                    success: false,
                });
            }
            if (otp !== user.forgot_password_otp) {
                return response.status(400).json({
                    message: "Invalid otp",
                    error: true,
                    success: false,
                });
            }
            //if otp is not expired
            //otp === user.forgot_password_otp
            const updateUser = yield user_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                forgot_password_otp: "",
                forgot_password_expiry: "",
            });
            return response.json({
                message: "Verify otp successfully",
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
//reset the password
function resetpassword(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, newPassword, confirmPassword } = request.body;
            if (!email || !newPassword || !confirmPassword) {
                return response.status(400).json({
                    message: "provide required fields email, newPassword, confirmPassword",
                });
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return response.status(400).json({
                    message: "Email is not available",
                    error: true,
                    success: false,
                });
            }
            if (newPassword !== confirmPassword) {
                return response.status(400).json({
                    message: "newPassword and confirmPassword must be same.",
                    error: true,
                    success: false,
                });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashPassword = yield bcryptjs_1.default.hash(newPassword, salt);
            const update = yield user_model_1.default.findOneAndUpdate(user._id, {
                password: hashPassword,
            });
            return response.json({
                message: "Password updated successfully.",
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
//refresh token controler
function refreshToken(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const refreshToken = request.cookies.refreshToken ||
                ((_b = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]); /// [ Bearer token]
            if (!refreshToken) {
                return response.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false,
                });
            }
            const verifyToken = yield jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
            if (!verifyToken) {
                return response.status(401).json({
                    message: "token is expired",
                    error: true,
                    success: false,
                });
            }
            const userId = verifyToken._id;
            const newAccessToken = yield (0, generateAccessToken_1.default)(userId);
            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            };
            response.cookie("accessToken", newAccessToken, cookiesOption);
            return response.json({
                message: "New Access token generated",
                error: false,
                success: true,
                data: {
                    accessToken: newAccessToken,
                },
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
//get login user details
function userDetails(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.userId;
            console.log(userId);
            const user = yield user_model_1.default.findById(userId).select("-password -refresh_token");
            return response.json({
                message: "user details",
                data: user,
                error: false,
                success: true,
            });
        }
        catch (error) {
            return response.status(500).json({
                message: "Something is wrong",
                error: true,
                success: false,
            });
        }
    });
}

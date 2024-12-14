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
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.RESEND_API) {
    console.log("Provide RESEND_API in side the .env file");
}
const resend = new resend_1.Resend(process.env.RESEND_API);
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ sendTo, subject, html, }) {
    try {
        const { data, error } = yield resend.emails.send({
            from: "Binkeyit <noreply@amitprajapati.co.in>",
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            return console.error({ error });
        }
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendEmail;

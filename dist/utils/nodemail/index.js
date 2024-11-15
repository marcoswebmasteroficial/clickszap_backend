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
exports.sendRecoveryEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const messages_1 = require("@utils/messages");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendRecoveryEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, otpCode } = options;
    const templatePath = path_1.default.join(__dirname, 'template', 'email-template.hbs');
    const source = fs_1.default.readFileSync(templatePath, 'utf8');
    const template = handlebars_1.default.compile(source);
    const html = template({ otpCode });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (_error) {
        throw new Error(messages_1.messages.errors.EMAIL_SEND_FAILED);
    }
});
exports.sendRecoveryEmail = sendRecoveryEmail;

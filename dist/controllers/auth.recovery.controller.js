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
exports.resetPassowrd = exports.verifyCodeOtp = exports.recoveryPass = void 0;
const response_1 = __importDefault(require("@utils/response"));
const messages_1 = require("@utils/messages");
const auth_recovery_service_1 = require("@services/auth.recovery.service");
const recoveryPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_recovery_service_1.recoveryPassword)(req.body);
        if (result.erros && result.erros.length > 0) {
            (0, response_1.default)(res, 400, {
                message: 'ERROR',
                errors: result.erros
            });
            return;
        }
        (0, response_1.default)(res, 200, {
            message: messages_1.messages.success.RECOVERY_EMAIL_SENT,
            data: {
                token: result.token
            }
        });
    }
    catch (error) {
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.recoveryPass = recoveryPass;
const verifyCodeOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, token } = req.body;
    try {
        const result = yield (0, auth_recovery_service_1.verifyOtp)(token, otp);
        if (result.erros && result.erros.length > 0) {
            (0, response_1.default)(res, 400, {
                message: 'ERROR',
                errors: result.erros
            });
            return;
        }
        (0, response_1.default)(res, 200, {});
    }
    catch (error) {
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.verifyCodeOtp = verifyCodeOtp;
const resetPassowrd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, token } = req.body;
    try {
        const result = yield (0, auth_recovery_service_1.resetPassword)(token, newPassword);
        console.log(result);
        if (result.erros && result.erros.length > 0) {
            (0, response_1.default)(res, 400, {
                message: 'ERROR',
                errors: result.erros
            });
            return;
        }
        (0, response_1.default)(res, 200, {});
    }
    catch (error) {
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.resetPassowrd = resetPassowrd;

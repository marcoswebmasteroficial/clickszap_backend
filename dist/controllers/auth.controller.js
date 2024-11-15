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
exports.refreshAccessToken = exports.registerUser = exports.loginUser = void 0;
const response_1 = __importDefault(require("@utils/response"));
const messages_1 = require("@utils/messages");
const auth_service_1 = require("@services/auth.service");
const token_service_1 = require("@services/token.service");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_service_1.login)(req.body);
        if (result.erros && result.erros.length > 0) {
            (0, response_1.default)(res, 400, {
                message: 'ERROR',
                errors: result.erros
            });
            return;
        }
        (0, response_1.default)(res, 200, {
            message: messages_1.messages.success.LOGIN_SUCCESS,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_service_1.register)(req.body);
        if (result.erros && result.erros.length > 0) {
            (0, response_1.default)(res, 400, {
                message: 'ERROR',
                errors: result.erros
            });
            return;
        }
        (0, response_1.default)(res, 200, {
            message: messages_1.messages.success.REGISTER_SUCCESS,
            data: result.email
        });
    }
    catch (error) {
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.registerUser = registerUser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        (0, response_1.default)(res, 400, { message: messages_1.messages.errors.TOKEN_REQUIRED });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const result = yield (0, token_service_1.refeshToken)(token);
        (0, response_1.default)(res, 200, {
            message: messages_1.messages.success.REFRESH_TOKEN_SUCCESS,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        (0, response_1.default)(res, 500, {
            message: messages_1.messages.errors.INTERNAL_SERVER_ERROR,
            error
        });
    }
});
exports.refreshAccessToken = refreshAccessToken;

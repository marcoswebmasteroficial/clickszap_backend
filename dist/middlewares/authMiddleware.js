"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("@utils/response"));
const messages_1 = require("@utils/messages");
const jwt_1 = require("@utils/jwt");
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        (0, response_1.default)(res, 401, {
            message: messages_1.messages.errors.TOKEN_INVALID
        });
        return;
    }
    try {
        const user = (0, jwt_1.verifyToken)(token, 'auth');
        console.log(user);
        if (!user || typeof user !== 'object') {
            (0, response_1.default)(res, 403, {
                message: messages_1.messages.errors.TOKEN_INVALID
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (_err) {
        (0, response_1.default)(res, 403, {
            message: messages_1.messages.errors.TOKEN_INVALID
        });
        return;
    }
};
exports.default = authenticateToken;

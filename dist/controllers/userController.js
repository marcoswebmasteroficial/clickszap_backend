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
exports.me = void 0;
const database_1 = require("@config/database");
const User_1 = require("@models/User");
const response_1 = __importDefault(require("@utils/response"));
const messages_1 = require("@utils/messages");
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            (0, response_1.default)(res, 401, { message: messages_1.messages.errors.USER_NOT_FOUND });
            return;
        }
        (0, response_1.default)(res, 200, {
            data: {
                id: user.id,
                email: user.email,
                name: user.name
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
exports.me = me;

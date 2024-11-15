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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refeshToken = void 0;
const database_1 = require("@config/database");
const User_1 = require("@models/User");
const jwt_1 = require("@utils/jwt");
const messages_1 = require("@utils/messages");
const refeshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, jwt_1.verifyToken)(token, 'refresh');
    if (!userId) {
        throw { status: 403, message: messages_1.messages.errors.INVALID_REFRESH_TOKEN };
    }
    const userRepository = database_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: userId.id })
        .addSelect('user.password')
        .getOne();
    if (!user) {
        throw { status: 404, message: messages_1.messages.errors.USER_NOT_FOUND };
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.id, 'auth', '1h');
    const refreshToken = (0, jwt_1.generateAccessToken)(user.id, 'refresh', '10min');
    const newTokenExpires = (0, jwt_1.decodeAccessToken)(refreshToken, 'refresh');
    if (!newTokenExpires || typeof newTokenExpires.exp === 'undefined') {
        throw new Error('Data de expiração não encontrada no refresh token.');
    }
    const accessTokenExpires = newTokenExpires.exp * 1000;
    return {
        accessToken,
        refreshToken,
        accessTokenExpires
    };
});
exports.refeshToken = refeshToken;

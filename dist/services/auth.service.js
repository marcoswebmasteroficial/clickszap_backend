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
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@utils/jwt");
const database_1 = require("@config/database");
const User_1 = require("@models/User");
const messages_1 = require("@utils/messages");
const hash_1 = __importDefault(require("@utils/hash"));
const validators_1 = require("@utils/validators");
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const erros = [];
    const repository = database_1.AppDataSource.getRepository(User_1.User);
    if (!email) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'E-mail' }));
    }
    if (!password) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'Senha' }));
    }
    if (erros.length === 0) {
        const user = yield repository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            erros.push(messages_1.messages.errors.INVALID_CREDENTIALS);
        }
        else {
            user.isOnline = true;
            yield repository.save(user);
            const accessToken = (0, jwt_1.generateAccessToken)(user.id, 'auth', '1h');
            const refreshToken = (0, jwt_1.generateAccessToken)(user.id, 'refresh', '10min');
            return {
                id: user.id,
                email: user.email,
                accessToken,
                refreshToken,
                erros
            };
        }
    }
    return { erros };
});
exports.login = login;
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password }) {
    const erros = [];
    const userRepository = database_1.AppDataSource.getRepository(User_1.User);
    if (!email) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'E-mail' }));
    }
    else if (!(0, validators_1.validateEmail)(email)) {
        erros.push(messages_1.messages.errors.INVALID_EMAIL_FORMAT);
    }
    if (!password) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'Senha' }));
    }
    else if (!(0, validators_1.validatePasswordStrength)(password)) {
        erros.push(messages_1.messages.errors.PASSWORD_TOO_WEAK);
    }
    if (!name) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'Nome' }));
    }
    if (erros.length === 0) {
        const existingUser = yield userRepository.findOne({
            where: { email },
            select: ['id']
        });
        if (existingUser) {
            erros.push(messages_1.messages.errors.EMAIL_ALREADY_REGISTERED);
        }
        else {
            const user = userRepository.create({
                email,
                password: yield (0, hash_1.default)(password),
                name
            });
            yield userRepository.save(user);
        }
    }
    return { email, erros };
});
exports.register = register;

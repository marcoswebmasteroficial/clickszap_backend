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
exports.resetPassword = exports.verifyOtp = exports.recoveryPassword = void 0;
const database_1 = require("@config/database");
const User_1 = require("@models/User");
const nodemail_1 = require("@utils/nodemail");
const messages_1 = require("@utils/messages");
const jwt_1 = require("@utils/jwt");
const Otp_1 = require("@models/Otp");
const validators_1 = require("@utils/validators");
const hash_1 = __importDefault(require("@utils/hash"));
const recoveryPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    const erros = [];
    const user = yield database_1.AppDataSource.getRepository(User_1.User).findOne({
        where: { email },
        select: ['id', 'email']
    });
    if (!user) {
        erros.push(messages_1.messages.errors.USER_NOT_FOUND);
        return { erros };
    }
    const existingOtp = yield database_1.AppDataSource.getRepository(Otp_1.Otp).findOne({
        where: { user }
    });
    const otpCode = (0, jwt_1.generateOTP)();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos de expiração
    const token = (0, jwt_1.generateAccessToken)(user.id, 'recovery', '5h');
    if (existingOtp) {
        // Atualiza o OTP existente
        existingOtp.code = otpCode;
        existingOtp.expiresAt = expiresAt;
        yield database_1.AppDataSource.getRepository(Otp_1.Otp).save(existingOtp);
    }
    else {
        // Cria um novo OTP
        const otp = new Otp_1.Otp();
        otp.code = otpCode;
        otp.expiresAt = expiresAt;
        otp.user = user;
        yield database_1.AppDataSource.getRepository(Otp_1.Otp).save(otp);
    }
    yield (0, nodemail_1.sendRecoveryEmail)({
        to: email,
        subject: 'Recuperação de Senha',
        otpCode
    });
    return { token, erros };
});
exports.recoveryPassword = recoveryPassword;
const verifyOtp = (token, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const erros = [];
    const userRepository = database_1.AppDataSource.getRepository(User_1.User);
    const optRepository = database_1.AppDataSource.getRepository(Otp_1.Otp);
    const check = (0, jwt_1.verifyToken)(token, 'recovery');
    if (!check) {
        erros.push('Token inválido ou expirado');
        return { erros };
    }
    const user = yield userRepository.findOne({
        where: { id: check.id },
        select: ['id']
    });
    const userOtp = yield optRepository.findOne({
        where: { user: { id: user === null || user === void 0 ? void 0 : user.id }, code: otp }
    });
    if (!userOtp) {
        erros.push('Código OTP incorreto ou não encontrado para o usuário');
    }
    else if (userOtp.expiresAt < new Date()) {
        erros.push('Código OTP expirado');
    }
    return { erros };
});
exports.verifyOtp = verifyOtp;
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const erros = [];
    const userRepository = database_1.AppDataSource.getRepository(User_1.User);
    const optRepository = database_1.AppDataSource.getRepository(Otp_1.Otp);
    const check = (0, jwt_1.verifyToken)(token, 'recovery');
    if (!check) {
        erros.push(messages_1.messages.errors.TOKEN_EXPIRED);
        return { erros };
    }
    const user = yield userRepository.findOne({
        where: { id: check.id },
        select: ['id']
    });
    if (!user) {
        erros.push(messages_1.messages.errors.USER_NOT_FOUND);
        return { erros };
    }
    const otp = yield optRepository.findOne({
        where: { user: { id: user === null || user === void 0 ? void 0 : user.id } }
    });
    if (!otp) {
        erros.push(messages_1.messages.errors.PASSWORD_RECOVERY_REQUEST_NOT_FOUND);
        return { erros };
    }
    const hashedPassword = yield (0, hash_1.default)(newPassword);
    if (!hashedPassword) {
        erros.push((0, messages_1.formatMessage)(messages_1.messages.errors.REQUIRED_FIELD, { text: 'Senha' }));
    }
    else if (!(0, validators_1.validatePasswordStrength)(newPassword)) {
        erros.push(messages_1.messages.errors.PASSWORD_TOO_WEAK);
    }
    user.password = hashedPassword;
    user.updatedAt = new Date();
    yield userRepository.save(user);
    yield optRepository.delete({ user: { id: user.id } });
    return { erros };
});
exports.resetPassword = resetPassword;

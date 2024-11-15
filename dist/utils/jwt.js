"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateOTP = exports.decodeAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretAuth = process.env.JWT_SECRET;
const secretRecovery = process.env.JWT_REFRESH_SECRET;
const secretRefresh = process.env.JWT_REFRESH_SECRET;
if (!secretAuth || !secretRecovery || !secretRefresh) {
    throw new Error('JWT_SECRET ou JWT_REFRESH_SECRET não estão definidos');
}
const generateAccessToken = (id, type = 'auth', expire) => {
    let secret;
    // Seleciona a chave secreta com base no tipo do token
    switch (type) {
        case 'auth':
            secret = secretAuth;
            break;
        case 'recovery':
            secret = secretRecovery;
            break;
        case 'refresh':
            secret = secretRefresh;
            break;
        default:
            throw new Error('Tipo de token desconhecido');
    }
    const payload = { id, type };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expire || '1h' });
};
exports.generateAccessToken = generateAccessToken;
const decodeAccessToken = (token, expectedType) => {
    let secret;
    // Seleciona a chave secreta com base no tipo de token
    switch (expectedType) {
        case 'auth':
            secret = secretAuth;
            break;
        case 'recovery':
            secret = secretRecovery;
            break;
        case 'refresh':
            secret = secretRefresh;
            break;
        default:
            console.error('Tipo de token desconhecido');
            return null;
    }
    try {
        // Decodifica e valida o token
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Verifica se o tipo do token corresponde ao esperado
        if (decoded.type !== expectedType) {
            throw new Error('Tipo de token inválido');
        }
        return decoded; // Retorna o payload do token
    }
    catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null; // Retorna null em caso de erro
    }
};
exports.decodeAccessToken = decodeAccessToken;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Gera um OTP de 6 dígitos
};
exports.generateOTP = generateOTP;
const verifyToken = (token, expectedType) => {
    let secret;
    // Seleciona a chave secreta com base no tipo de token
    switch (expectedType) {
        case 'auth':
            secret = secretAuth;
            break;
        case 'recovery':
            secret = secretRecovery;
            break;
        case 'refresh':
            secret = secretRefresh;
            break;
        default:
            console.error('Tipo de token desconhecido');
            return null;
    }
    try {
        // Verifica e decodifica o token
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Verifica se o tipo do token corresponde ao esperado
        if (decoded.type !== expectedType) {
            throw new Error('Tipo de token inválido');
        }
        return decoded; // Retorna o payload do token
    }
    catch (_error) {
        return null; // Retorna null se o token for inválido ou expirar
    }
};
exports.verifyToken = verifyToken;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("@routes/auth"));
const users_1 = __importDefault(require("@routes/users"));
const recovery_1 = __importDefault(require("@routes/recovery"));
//import authenticateToken from '@middlewares/authMiddleware'
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/users', users_1.default);
router.use('/recovery', recovery_1.default);
//router.post('/me', authenticateToken, registerUser)
router.get('/', (_req, res) => {
    res.status(200).json({ message: 'API funcionando!' });
});
exports.default = router;

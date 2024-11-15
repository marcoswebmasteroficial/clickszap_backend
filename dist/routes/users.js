"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("@controllers/userController");
const authMiddleware_1 = __importDefault(require("@middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get('/me', authMiddleware_1.default, userController_1.me);
router.post('/', (_req, res) => {
    // Lógica para criar um novo usuário
    res.status(201).send('Usuário criado');
});
exports.default = router;

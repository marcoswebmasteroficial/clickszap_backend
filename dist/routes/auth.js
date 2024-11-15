"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/login', auth_controller_1.loginUser);
router.post('/register', auth_controller_1.registerUser);
router.post('/refresh', auth_controller_1.refreshAccessToken);
exports.default = router;

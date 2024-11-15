"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_recovery_controller_1 = require("@controllers/auth.recovery.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', auth_recovery_controller_1.recoveryPass);
router.post('/verify', auth_recovery_controller_1.verifyCodeOtp);
router.post('/reset', auth_recovery_controller_1.resetPassowrd);
exports.default = router;

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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("@utils/logger"));
const database_1 = require("@config/database");
const index_1 = __importDefault(require("@routes/index"));
const errorHandler_1 = require("@middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(errorHandler_1.errorHandler);
app.use(express_1.default.json());
app.use('/api', index_1.default);
function initializeServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const PORT = process.env.PORT || 4000;
            yield database_1.AppDataSource.initialize();
            app.listen(PORT, () => {
                logger_1.default.info(`🚀 Server started on http://localhost:${PORT}`);
            });
        }
        catch (error) {
            logger_1.default.error(`Erro ao iniciar o servidor: ${error}`);
            process.exit(1);
        }
    });
}
initializeServer();

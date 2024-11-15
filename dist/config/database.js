"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TYPE === 'sqlite' ? 'database.sqlite' : '',
    synchronize: true,
    logging: false,
    entities: [path_1.default.resolve(__dirname, '../models/*.ts')],
    migrations: [path_1.default.resolve(__dirname, '../migrations/*.ts')],
    subscribers: []
});
exports.AppDataSource = AppDataSource;

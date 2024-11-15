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
exports.CreatePasswordResetTokenTable1730221795715 = void 0;
class CreatePasswordResetTokenTable1730221795715 {
    constructor() {
        this.name = 'CreatePasswordResetTokenTable1730221795715';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
        "id" varchar PRIMARY KEY NOT NULL,
        "token" varchar NOT NULL,
        "expiration" datetime NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "userId" varchar
      )
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove a tabela se necessário
            yield queryRunner.query(`DROP TABLE IF EXISTS "password_reset_tokens"`);
        });
    }
}
exports.CreatePasswordResetTokenTable1730221795715 = CreatePasswordResetTokenTable1730221795715;

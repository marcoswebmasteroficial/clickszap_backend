"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, responseData) => {
    // Altere aqui para retornar Response
    const { message, data, error, errors } = responseData;
    return res.status(statusCode).json({
        // Retorne o objeto Response
        message,
        data,
        errors,
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
};
exports.default = sendResponse;

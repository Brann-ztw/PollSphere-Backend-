"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestBody = void 0;
const validateRequestBody = (body, requiredFields) => {
    for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === '')
            return false;
    }
    return true;
};
exports.validateRequestBody = validateRequestBody;

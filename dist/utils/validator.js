"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isString = void 0;
const isString = (value) => {
    return (typeof value === 'string' || value instanceof String);
};
exports.isString = isString;
const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (0, exports.isString)(value) && emailRegex.test(value.toString());
};
exports.isEmail = isEmail;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeAsDayjs = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const timeAsDayjs = (value = new Date()) => {
    const applyTimezone = true;
    if (!applyTimezone)
        return (0, dayjs_1.default)(value, 'GMT');
    return (0, dayjs_1.default)(value);
};
exports.timeAsDayjs = timeAsDayjs;

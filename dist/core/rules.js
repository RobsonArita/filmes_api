"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_check_1 = __importDefault(require("request-check"));
const validator_1 = require("../utils/validator");
const error_handler_1 = require("../middlewares/error_handler");
class Rules {
    constructor() {
        this.validator = (0, request_check_1.default)();
        this.validator.requiredMessage = 'Campo obrigatório!';
        this.validator.addRule('name', {
            validator: (value) => (0, validator_1.isString)(value),
            message: 'Campo inválido!'
        });
        this.validator.addRule('email', {
            validator: (value) => (0, validator_1.isEmail)(value),
            message: 'Campo inválido!'
        });
        this.validator.addRule('password', {
            validator: (value) => (0, validator_1.isString)(value),
            message: 'Campo inválido!'
        });
        this.validator.addRule('newPassword', {
            validator: (value) => (0, validator_1.isString)(value),
            message: 'Campo inválido!'
        });
    }
    invalid(...args) {
        //@ts-ignore
        return this.validator.check(...args);
    }
    validate(...args) {
        //@ts-ignore
        const invalid = this.validator.check(...args);
        if (invalid)
            throw new error_handler_1.CustomError({ code: 400, data: { 'Campos inválidos': Object.assign({}, invalid) } });
    }
}
exports.default = Rules;

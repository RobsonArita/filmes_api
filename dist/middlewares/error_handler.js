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
exports.UserNotFound = exports.AutenticatedEmailNotFound = exports.RegisteredEmailNotFound = exports.AlreadyRegisteredUserException = exports.CustomError = void 0;
const colors_1 = __importDefault(require("colors"));
const responser_1 = __importDefault(require("../core/responser"));
class CustomError {
    constructor(err) {
        this.code = err.code;
        this.data = err.data;
    }
}
exports.CustomError = CustomError;
class AlreadyRegisteredUserException extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Já existe um usuário com o email informado.' } });
    }
}
exports.AlreadyRegisteredUserException = AlreadyRegisteredUserException;
class RegisteredEmailNotFound extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Ocorreu um erro.' } });
    }
}
exports.RegisteredEmailNotFound = RegisteredEmailNotFound;
class AutenticatedEmailNotFound extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Email ou senha inválida' } });
    }
}
exports.AutenticatedEmailNotFound = AutenticatedEmailNotFound;
class UserNotFound extends CustomError {
    constructor() {
        super({ code: 404, data: { message: 'Usuário não encontrado.' } });
    }
}
exports.UserNotFound = UserNotFound;
const errorHandler = (err, request, response, _) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(colors_1.default.red(`[${request.method}] ${request.originalUrl}`), err);
    const handleResponser = new responser_1.default(response);
    if (!err.code)
        return handleResponser.sendInternalServerError(err.data);
    switch (err.code) {
        case 400:
            return handleResponser.sendBadRequest(err.data);
        case 404:
            return handleResponser.sendNotFound(err.data);
    }
    return handleResponser.sendInternalServerError(err.data);
});
exports.default = errorHandler;

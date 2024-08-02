"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
const responser_1 = __importDefault(require("./responser"));
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    getHandleResponser(response) {
        return new responser_1.default(response);
    }
}
exports.Controller = Controller;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const setup_config_1 = require("./core/config/setup_config");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, setup_config_1.setupRoutes)(app);
(0, setup_config_1.setupServer)(server);

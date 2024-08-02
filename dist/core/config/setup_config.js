"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = exports.setupMiddlewares = exports.setupRoutes = void 0;
const unauth_router_1 = require("../../routers/unauth_router");
const express_1 = require("express");
const colors_1 = __importDefault(require("colors"));
const time_1 = require("../../utils/time");
const settings_1 = __importDefault(require("../settings"));
const setupRoutes = (app) => {
    (0, exports.setupMiddlewares)(app);
    app.use('/', unauth_router_1.unauthRouter);
};
exports.setupRoutes = setupRoutes;
const setupMiddlewares = (app) => {
    app.use((0, express_1.json)({ limit: '100mb' }));
    // app.use(urlencoded({ extended: false, limit: '100mb' }))
    app.use(terminalConsole);
    app.use((req, res, next) => {
        res.type('json');
        next();
    });
};
exports.setupMiddlewares = setupMiddlewares;
const methodColors = (method) => {
    switch (method) {
        case 'POST':
            return colors_1.default.blue(method);
        case 'GET':
            return colors_1.default.green(method);
        case 'PUT':
            return colors_1.default.yellow(method);
        case 'DELETE':
            return colors_1.default.red(method);
        case 'PATCH':
            return colors_1.default.yellow(method);
        default:
    }
};
const terminalConsole = (request, _, next) => {
    const method = methodColors(request.method.trim());
    if (!method)
        return next();
    const requester = colors_1.default.blue(request.ip.replace(/[^\d.]/g, ''));
    const path = colors_1.default.cyan(request.url);
    const timer = colors_1.default.white((0, time_1.timeAsDayjs)().format('HH:mm') || '');
    console.info(`${timer} ${requester} ${method} ${path}`);
    //@ts-ignore
    if (Object.keys(request.body).length)
        console.info(request.body);
    return next();
};
exports.default = terminalConsole;
const setupServer = (app) => {
    console.log(colors_1.default.blue('SERVER: Is running on'), colors_1.default.yellow(`${settings_1.default.IP}:${settings_1.default.PORT}`));
    //@ts-ignore
    app.listen(settings_1.default.PORT, settings_1.default.IP);
};
exports.setupServer = setupServer;

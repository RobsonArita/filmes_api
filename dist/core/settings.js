"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class Settings {
    constructor() {
        var _a, _b, _c, _d, _e, _f;
        this.IP = (_a = process.env.IP) !== null && _a !== void 0 ? _a : '';
        this.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : '';
        this.JWT_SECRET = (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : '';
        this.ENVIRONMENT = (_d = process.env.ENVIRONMENT) !== null && _d !== void 0 ? _d : 'dev';
        this.MAILER_USER = (_e = process.env.MAILER_USER) !== null && _e !== void 0 ? _e : '';
        this.MAILER_PASSWORD = (_f = process.env.MAILER_PASSWORD) !== null && _f !== void 0 ? _f : '';
    }
    isLocal() {
        return Boolean(this.ENVIRONMENT === 'dev');
    }
}
exports.default = new Settings();

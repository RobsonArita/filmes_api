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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class PostgressAdapter {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    timeNow() {
        return new Date();
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    createdAt: this.timeNow()
                },
            });
        });
    }
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email }
            });
            return user !== null;
        });
    }
    getUserById(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, omitPassword = true) {
            return this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    password: omitPassword
                },
            });
        });
    }
    getUserByEmail(email_1) {
        return __awaiter(this, arguments, void 0, function* (email, selectPassword = false) {
            return this.prisma.user.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    password: selectPassword
                },
            });
        });
    }
    updateUser(where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.update({
                where,
                data: Object.assign(Object.assign({}, data), { updatedAt: this.timeNow() }),
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.delete({
                where: { id: userId },
            });
        });
    }
}
exports.default = PostgressAdapter;

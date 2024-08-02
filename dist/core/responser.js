"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Responser {
    constructor(response) {
        this.response = response;
    }
    sendOk(data) {
        this.response.status(200).json(data);
    }
    sendBadRequest(data) {
        this.response.status(400).json(data);
    }
    sendNotFound(data) {
        this.response.status(404).json(data);
    }
    sendInternalServerError(data) {
        this.response.status(500).json(data);
    }
}
exports.default = Responser;

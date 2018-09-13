"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const api = new koa_router_1.default();
api.get('/api', async (ctx) => {
    ctx.body = {
        message: "Hello world"
    };
});
exports.default = api;
//# sourceMappingURL=api.js.map
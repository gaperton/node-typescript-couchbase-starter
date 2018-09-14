"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
class ServiceRouter extends koa_router_1.default {
    // Expose standard endpoint.
    expose(root, endpoint) {
        return this;
    }
}
exports.default = ServiceRouter;
// expose an endpoint as a service
// router.expose( '/users/:user', async
//      read
// })
//# sourceMappingURL=service.js.map
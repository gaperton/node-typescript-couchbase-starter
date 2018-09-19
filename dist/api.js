"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_tr_1 = __importDefault(require("./lib/koa-router-tr"));
const user_1 = require("./realtime/user");
const api = new koa_router_tr_1.default();
api
    .endpoint('/api/users', user_1.User)
    //    .endpoint( '/api/roles', Role )
    // New feature: Projection!
    .get('/api/userlist', async (ctx) => {
    const attributes = ['firstName', 'lastName'], list = new user_1.User.Collection();
    // Fetch restricted set of attributes...
    //await list.fetch({ attributes });
    // Serialize restricted set of attributes...
    return list.toJSON({ attributes });
});
exports.default = api;
//# sourceMappingURL=api.js.map
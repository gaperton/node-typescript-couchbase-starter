"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importStar(require("./app"));
// Initialize session
// ====================
const koa_session_1 = __importDefault(require("koa-session"));
app_1.default.keys = ['some secret hurr'];
app_1.default.use(koa_session_1.default({
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
}, app_1.default));
// Routes
// ==========
const api_1 = __importDefault(require("./api"));
app_1.default.use(api_1.default.routes())
    .use(api_1.default.allowedMethods());
const koa_static_1 = __importDefault(require("koa-static"));
app_1.default.use(koa_static_1.default('./www', { gzip: true }));
app_1.default.listen(3000);
app_1.httpLogger.info('listening on port 3000');
//# sourceMappingURL=index.js.map
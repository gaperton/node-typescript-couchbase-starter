"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const httpLogger = winston_1.createLogger({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.simple()
        }),
        new winston_1.transports.File({
            filename: './logs/http.log',
            decolorize: true,
            format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.uncolorize())
        })
    ]
});
httpLogger.info('Started');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const app = new koa_1.default();
app.use(koa_logger_1.default((ctx, args) => {
    httpLogger.info(ctx);
}));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
app.use(koa_bodyparser_1.default());
// Initialize session
// ====================
const koa_session_1 = __importDefault(require("koa-session"));
app.keys = ['some secret hurr'];
app.use(koa_session_1.default({
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
}, app));
// Routes
// ==========
const api_1 = __importDefault(require("./api"));
app.use(api_1.default.routes())
    .use(api_1.default.allowedMethods());
const koa_static_1 = __importDefault(require("koa-static"));
app.use(koa_static_1.default('./www', { gzip: true }));
app.listen(3000);
console.log('listening on port 3000');
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const winston_1 = require("winston");
exports.httpLogger = winston_1.createLogger({
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
const app = new koa_1.default();
app.use(koa_logger_1.default((ctx, args) => {
    exports.httpLogger.info(ctx);
}));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
app.use(koa_bodyparser_1.default());
exports.default = app;
//# sourceMappingURL=app.js.map
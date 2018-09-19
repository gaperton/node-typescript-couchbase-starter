"use strict";
/**
 * Koa router binding for Type-R
 *
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const proxy_1 = require("type-r/endpoints/proxy");
class EndpointRouter extends koa_router_1.default {
    endpoint(path, resource) {
        endpoint(this, path, resource);
        return this;
    }
}
exports.default = EndpointRouter;
function endpoints(router, endpoints) {
    for (let root in endpoints) {
        endpoint(router, root, endpoints[root]);
    }
}
exports.endpoints = endpoints;
function endpoint(router, root, a_endpoint) {
    const resource = root + '/:id', endpoint = typeof a_endpoint === 'function' ? proxy_1.proxyIO(a_endpoint) : a_endpoint;
    if ('read' in endpoint) {
        router.get(resource, async (ctx) => {
            ctx.body = await endpoint.read(ctx.params.id, parseQuery(ctx));
        });
    }
    if ('update' in endpoint) {
        router.put(resource, async (ctx) => {
            ctx.body = await endpoint.update(ctx.params.id, ctx.request.body, parseQuery(ctx));
        });
    }
    if ('destroy' in endpoint) {
        router.del(resource, async (ctx) => {
            ctx.body = await endpoint.destroy(ctx.params.id, parseQuery(ctx));
        });
    }
    if ('list' in endpoint) {
        router.get(root, async (ctx) => {
            ctx.body = await endpoint.list(parseQuery(ctx));
        });
    }
    if ('create' in endpoint) {
        router.post(root, async (ctx) => {
            ctx.body = await endpoint.create(ctx.request.body, parseQuery(ctx));
        });
    }
    // Generic RPC request must look like this:
    // POST root/procName arg : JSON[] => any
    if ('rpc' in endpoint) {
        for (let name in endpoint.rpc) {
            router.post(root + '/' + name, async (ctx) => {
                ctx.body = await endpoint.rpc[name](...ctx.request.body, parseQuery(ctx));
            });
        }
    }
}
exports.endpoint = endpoint;
function parseQuery({ request, params }) {
    let res = { pathParams: params }, { query } = request;
    for (let key of Object.keys(query)) {
        const s = query[key];
        try {
            res[key] = JSON.parse(s);
        }
        catch (e) {
            res[key] = s;
        }
    }
    return res;
}
//# sourceMappingURL=koa-router-tr.js.map
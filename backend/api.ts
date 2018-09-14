import Router from 'koa-router'

const api = new Router();

api.get( '/api', async ctx => {
    ctx.body = {
        message : "Hello world"
    };
});

/**
 * 1) api.endpoint( '/name', endpoint )
 * 2) api.get( '/api', 
 * }))
 */

export default api;
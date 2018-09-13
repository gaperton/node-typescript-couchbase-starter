import Router from 'koa-router'

const api = new Router();

api.get( '/api', async ctx => {
    ctx.body = {
        message : "Hello world"
    };
});

export default api;
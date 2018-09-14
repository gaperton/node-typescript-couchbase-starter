import Router from './lib/koa-router-tr'

const api = new Router();

api
    .endpoint( '/api/users', User )
    .endpoint( '/api/roles', Role );

export default api;
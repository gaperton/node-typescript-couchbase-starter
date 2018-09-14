import Router from 'koa-router'
import { endpoints } from './lib/service';

const api = new Router();

api.get( '/api', async ctx => {
    ctx.body = {
        message : "Hello world"
    };
});

endpoints( api, {
    '/api/users' : User,
    '/api/some' : {
        async read(){
            
        }
    }
});

/**
 * 1) api.endpoint( '/name', endpoint )
 * 2) api.get( '/api', 
 * }))
 */

export default api;
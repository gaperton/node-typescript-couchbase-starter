import dotenv from "dotenv";
dotenv.config({ path : ".env" });

import Koa from 'koa'
const app = new Koa();

// Initialize session
// ====================
import session from 'koa-session'

app.keys = ['some secret hurr'];

app.use(session({
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/  
}, app));

// Routes
// ==========
import serve from 'koa-static'
import mount  from 'koa-mount'

app.use( serve( '../www', { gzip : true } ) );

import Router from 'koa-router'

const rootRouter = new Router();

rootRouter
    .use( '/api', restApi.routes(), restApi.allowedMethods() )
    .get( '/:parm*', async ctx => {

    } );

app.listen(6666);
console.log('listening on port 6666');

const indexHtml = ( session : object ) => `
    <html>
        <script type="text/javascript">
            window.__PRELOAD_SESSION_DATA___ = ${ JSON.stringify( session ) };
        </script>
    </html>
`;
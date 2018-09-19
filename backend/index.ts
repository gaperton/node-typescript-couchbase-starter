
import "reflect-metadata"

import app, { httpLogger } from './app'

// Initialize session
// ====================

import session from 'koa-session'

app.keys = ['some secret hurr'];

app.use(session({
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

import api from './api'

app.use( api.routes() )
   .use( api.allowedMethods() );

import serve from 'koa-static'

app.use( serve( './www', { gzip : true } ) );

app.listen(3000);

httpLogger.info('listening on port 3000');
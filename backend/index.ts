import dotenv from "dotenv";
dotenv.config({ path : ".env" });

import Koa from 'koa'
const app = new Koa();

import bodyParser from 'koa-bodyparser'
app.use(bodyParser());


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

app.listen(6666);

console.log('listening on port 6666');
import { createLogger, transports, http, format } from 'winston'
import stripAnsi from 'strip-ansi'

const httpLogger = createLogger({
    transports: [
      new transports.Console({
          format : format.simple()
      }),
      new transports.File({
          filename: './logs/http.log',
          decolorize : true,
          format : format.combine(
              format.simple(),
              format.uncolorize()
          )
      } as any)
    ]
});

httpLogger.info( 'Started' );

import dotenv from "dotenv";
dotenv.config({ path : ".env" });

import Koa from 'koa'
import logger from 'koa-logger'

const app = new Koa();
app.use( ( logger as any )( ( ctx : any, args : any ) => {
    httpLogger.info( ctx );
} ) );

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

app.listen(3000);

console.log('listening on port 3000');
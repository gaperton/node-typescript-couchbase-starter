import dotenv from "dotenv";
dotenv.config({ path : ".env" });

import Koa from 'koa'
import logger from 'koa-logger'
import { createLogger, transports, format } from 'winston'

export const httpLogger = createLogger({
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

const app = new Koa();
app.use( ( logger as any )( ( ctx : any, args : any ) => {
    httpLogger.info( ctx );
} ) );

import bodyParser from 'koa-bodyparser'
app.use(bodyParser());

export default app;
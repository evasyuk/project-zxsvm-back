import logger from "koa-logger"
import json from "koa-json"
import corsMiddleware from "./corsMiddleware"
// import bodyParser from "koa-bodyparser" // better with 'multipart' support

import fireAdminMiddleware from "./fireAdminMiddleware"
import multiPartSupportMiddleware from './multiPartSupportMiddleware'

const applyMiddlewares = (app) => {

    // Middlewares
    app.use(corsMiddleware)
    app.use(fireAdminMiddleware)
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });
    // app.use(bodyParser())
    app.use(multiPartSupportMiddleware)
    app.use(json())
    app.use(logger({
        transporter: (str, args) => {
            console.log(str)
        }
    }))
}

export default applyMiddlewares
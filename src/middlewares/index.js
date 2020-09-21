// import logger from "koa-logger"
import json from "koa-json"
import bodyParser from "koa-bodyparser"

const applyMiddlewares = (app) => {

// Middlewares
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });
    app.use(bodyParser())
    app.use(json())
    // app.use(logger({
    //     transporter: (str, args) => {
    //         // console.log(str)
    //     }
    // }))
}

export default applyMiddlewares
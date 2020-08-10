import "@babel/polyfill"

import Koa from "koa"

import applyMiddlewares from "./src/middlewares"
import applyAllRoutes from "./src/routes"

const app = new Koa()

applyMiddlewares(app)
applyAllRoutes(app)

app.listen(9339, () => {
    console.log("node task planner started")
})
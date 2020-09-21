import Koa from "koa"

import applyMiddlewares from "./middlewares"
import applyAllRoutes from "./routes"

const app = new Koa()

applyMiddlewares(app)
applyAllRoutes(app)

export {
  app,
}

import Koa from "koa"

import applyMiddlewares from "./middlewares"
import applyAllRoutes from "./routes"

const app = new Koa()

applyMiddlewares(app)
applyAllRoutes(app)

const PORT = 9339
app.listen(PORT, () => {
    console.log(`node task planner started on port [${PORT}]`)
})
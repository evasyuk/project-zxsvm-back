import Router from "koa-router"
import Hello from './PIng'

const router = new Router()

router.get("/hello", Hello)

const getAllRoutes = (app) => {
    // Routes
    app.use(router.routes()).use(router.allowedMethods())
}

export default getAllRoutes
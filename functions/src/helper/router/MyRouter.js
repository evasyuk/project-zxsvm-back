import Router from "koa-router";
import { WrongArgument } from "../../error";
import Executable from "./Exe";
import { withAction } from "./exeRunner";

import authMiddleware from "../../middlewares/authMiddleware";

const router = new Router()

class MyRouter {

    get = (name, executable, options = {
        authEnabled: false,
    }) => {
        if (!name || typeof name != 'string') {
            throw new WrongArgument('name')
        }

        if (!executable || !(executable['__proto__'].name === 'Executable')) {
            throw new WrongArgument('executable')
        }

        if (options.authEnabled) {
            router.get(name, authMiddleware, withAction(executable))
        } else {
            router.get(name, withAction(executable))
        }
    }

    post = (name, executable, options = {
        authEnabled: false,
    }) => {
        if (!name || typeof name != 'string') {
            throw new WrongArgument('name')
        }

        if (!executable || !(executable['__proto__'].name === 'Executable')) {
            throw new WrongArgument('executable')
        }

        if (options.authEnabled) {
            router.post(name, authMiddleware, withAction(executable))
        } else {
            router.post(name, withAction(executable))
        }
    }

    withApp = (app) => {
        app
          .use(router.routes())
          .use(router.allowedMethods())
    }
}

export default MyRouter

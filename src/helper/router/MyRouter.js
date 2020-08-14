import Router from "koa-router";
import { WrongArgument } from "../../error";
import Executable from "./Exe";
import { withAction } from "./exeRunner";

const router = new Router()

class MyRouter {
    _getAuth = (options) => {
        if (options.authEnabled) {
            return null
        }
        return null
    }

    get = (name, executable, options = {
        authEnabled: false,
    }) => {
        if (!name || typeof name != 'string') {
            throw new WrongArgument('name')
        }

        if (!executable || !(executable['__proto__'].name === 'Executable')) {
            throw new WrongArgument('executable')
        }

        router.get(name, withAction(executable))
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

        router.post(name, withAction(executable))
    }

    withApp = (app) => {
        app.use(router.routes()).use(router.allowedMethods())
    }
}

export default MyRouter

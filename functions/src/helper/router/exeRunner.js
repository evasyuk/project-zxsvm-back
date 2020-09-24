import ContextHelper from '../ContextHelper'
import {WrongArgument} from "../../error";

export function withAction(actionClass) {
    return async function serviceRunner(ctx) {
        const actionParams = {
            params: actionClass.paramsBuilder(ctx),
            context: actionClass.contextBuilder(ctx),
        }
        const resultPromise = _runAction(actionClass, actionParams)

        return _renderPromiseAsJson(ctx, resultPromise)
    }
}

async function _runAction(ServiceClass, { context = {}, params = {} }) {
    try {
        return new ServiceClass({ context }).run(params)
    } catch (error) {
        throw error
    }
}

async function _renderPromiseAsJson(ctx, promise) {
    try {
        const result = await promise
        let code = result.code || 200,
            message = null,
            payload = null

        if (result.data) {
            payload = {
                data: result.data,
                headers: result.headers,
            }
        } else if (result.message) {
            code = result.code
            message = result.message
        } else {
            ContextHelper.error(ctx, new WrongArgument('executable misses "data" or "message"'), 500)
        }

        if (code === 200 || code === 201) {
            ContextHelper.success(ctx, payload, code)
        } else {
            ContextHelper.errorMsg(ctx, message, code)
        }
    } catch (error) {
        ContextHelper.error(ctx, error, undefined, error.fields)
    }
}

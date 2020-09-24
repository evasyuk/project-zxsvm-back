// http response body standard is "JSend"
//
// https://github.com/omniti-labs/jsend
class ContextHelper {
    static success(context, payload, code = 200) {
        context.status = code
        context.body = {
            status: 'success',
            data: payload.data,
        }

        if (payload.headers) {
            Object.keys(payload.headers).forEach((key) => {
                context.set[key] = payload.headers[key]
            })
        }
    }

    static error(context, error = new Error(), code = 400, fields) {
        const { message = String(error) } = error

        context.status = code
        context.body = {
            status: 'error',
            message,
        }

        if (fields) {
            context.body.fields = fields
        }

        // if (process.env.SENTRY_URL) {
        //     context.app.emit('error', error, context)
        // } else if (code === 400 || code === 500) {
        //     console.error(error)
        // }
    }

    static errorMsg(context, errorMsg = 'ERROR.DEV_ERROR', code = 400, fields) {
        context.status = code
        context.body = {
            status: 'error',
            message: errorMsg,
        }

        if (fields) {
            context.body.fields = fields
        }

        // if (process.env.SENTRY_URL) {
        //     context.app.emit('error', error, context)
        // } else if (code === 400 || code === 500) {
        //     console.error(error)
        // }
    }
}

export default ContextHelper

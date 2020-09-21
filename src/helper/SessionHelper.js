const JWT_SECRET = process.env.DB_SEED
const JWT_TTL = "30d"

const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const AUTH = 'Authorization'

class CookieHelper {
    static async cookieSetNewToken(ctx, payload) {
        try {
            const token = SessionHelper.generateToken(payload)
            ctx.response.set(AUTH, token)
        } catch (err) {
            // console.log('cookieSetNewToken', err)
        }
    }

    static async cookieGetToken(ctx) {
        const cooka = ctx.request.get(AUTH)
        return SessionHelper.verifyAndDecodeToken(cooka)
    }
}

class SessionHelper {
    static async generateToken(payload) {
        const safeTTL = () => {
            const temp = JWT_TTL
            if (temp) {
                if (temp instanceof String) {
                    // TODO: imperfect check
                    if (temp.endsWith('m') || temp.endsWith('d')) {
                        return temp
                    } else {
                        return "1d"
                    }
                } else if (temp instanceof Number) {
                    return (JWT_TTL || 60) * 1000  // "1d" - 1day, "10" - 10ms => default 1 hour
                } else {
                    return "1d"
                }
            } else {
                return "1d"
            }
        }
        const te = safeTTL()
        return jwt.sign(
            payload,
            JWT_SECRET,
            {
                expiresIn: te
            },
        )
    }

    static async verifyAndDecodeToken(token) {
        try {
            const decodedPayload = jwt.verify(token, JWT_SECRET)
            return {
                isError: false,
                errorMessage: null,
                decodedPayload,
            }
        } catch (error) {
            return {
                isError: true,
                errorMessage: `token: ${error.message}`,
                decodedPayload: null,
            }
        }
    }
}

export {
    SessionHelper,
    CookieHelper,
}

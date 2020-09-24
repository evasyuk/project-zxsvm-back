import Exe from '../../helper/router/Exe';
import FireAuthHelper from '../../helper/FireAuthHelper';
import FirestoreHelper from '../../helper/FirestoreHelper';

class UserLogin extends Exe {
    static validationRules = {
        email: ['required', 'email'],
        password: ['required', 'string']
    }

    static paramsBuilder = (ctx) => ({
        email: ctx.req?.body?.email,
        password: ctx.req?.body?.password,
    })

    static contextBuilder = (ctx) => ({
        fireadmin: ctx.fireadmin,
    })

    async execute({ email, password }) {
        const {
            success,
            token,
            message = ':/'
        } = await FireAuthHelper.login({ fireadmin: this.context.fireadmin, email, password })

        if (success) {
            const {
                success,
                message,
                userRecord,
            } = await FirestoreHelper.getUserByEmail({ fireadmin: this.context.fireadmin, email })

            if (success) {
                return {
                    data: {
                        token,
                        userRecord,
                    },
                }
            } else {
                return {
                    message,
                    code: 401
                }
            }
        } else {
            return {
                message,
                code: 401
            }
        }
    }
}

export default UserLogin

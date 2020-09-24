import Exe from '../../helper/router/Exe'
import FireAuthHelper from '../../helper/FireAuthHelper';
import FirestoreHelper from '../../helper/FirestoreHelper';

class UserRegister extends Exe {
    static validationRules = {
        name: ['required', 'string'],
        email: ['required', 'trim', 'email'],
        password: ['required', 'trim', 'string'],
        phone: ['required', 'trim', 'string'],
    }

    static paramsBuilder = (ctx) => ({
        name: ctx.req?.body?.name,
        email: ctx.req?.body?.email,
        password: ctx.req?.body?.password,
        phone: ctx.req?.body?.phone,
    })

    static contextBuilder = (ctx) => ({
        fireadmin: ctx.fireadmin,
    })

    async execute({ name, email, password, phone }) {
        const {
            success,
            token,
            message = ':/',
        } = await FireAuthHelper.register({
            fireadmin: this.context.fireadmin,
            email,
            phone,
            password,
            name,
        })

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
                    code: 201
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
                code: 400
            }
        }
    }

}

export default UserRegister

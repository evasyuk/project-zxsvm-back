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
        try {
            const [success, token, message] = await this.register({ name, email, password, phone })
            if (success) {
                const [ success, message, userRecord] = await this.getUser(email)

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
        } catch (error) {
            return {
                message: `AUTH.VALIDATION_ERROR`,
                code: 400
            }
        }
    }

    register = async ({ email, phone, password, name, }) => {
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
        return [success, token, message]
    }

    getUser = async (email) => {
        const {
            success,
            message,
            userRecord,
        } = await FirestoreHelper.getUserByEmail({ fireadmin: this.context.fireadmin, email })
        return [success, message, userRecord]
    }
}

export default UserRegister

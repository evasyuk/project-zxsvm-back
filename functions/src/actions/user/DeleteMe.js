import Exe from '../../helper/router/Exe';
import FireAuthHelper from "../../helper/FireAuthHelper";

class DeleteMe extends Exe {
    static validationRules = {
        uid: ['required', 'string'],
        email: ['required', 'string'],
    }

    static paramsBuilder = (ctx) => ({
        uid: ctx.state.user.uid,
        email: ctx.state.userRecord.email,
    })

    static contextBuilder = (ctx) => ({
        fireadmin: ctx.fireadmin,
    })

    async execute({ uid, email }) {
        const [success, message] = await this.doDelete(email, uid)

        if (success) {
            return {
                data: {}
            }
        } else {
            return {
                data: {
                    message,
                },
                code: 500,
            }
        }return {
            data: {}
        }
    }

    async doDelete(email, uid) {
        const {
            success,
            message = ':/',
        } = await FireAuthHelper.deleteUser(this.context.fireadmin, { email, uid })
        return [success, message]
    }
}

export default DeleteMe

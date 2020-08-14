import Exe from '../../helper/router/Exe'
import {RepoUser} from "../../repository";
import {UserNotFound, UserWrongCredentials} from "../../error";

class UserLogin extends Exe {
    static validationRules = {
        email: ['required', 'email'],
        password: ['required', 'string']
    }

    static paramsBuilder = (ctx) => ({
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    })

    async execute({ email, password }) {
        const users = await RepoUser.getUserByEmail(email)
        if (!users.length) {
            throw new UserNotFound()
        }

        const user = users[0]

        if (user.password !== password) {
            throw new UserWrongCredentials()
        }

        return {
            data: {
                user,
            },
        }
    }
}

export default UserLogin

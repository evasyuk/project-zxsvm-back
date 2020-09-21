import Exe from '../../helper/router/Exe'
// import { RepoUser } from "../../repository";
// import { UserAlreadyExists } from "../../error";

class UserRegister extends Exe {
    static validationRules = {
        name: ['required', 'string'],
        email: ['required', 'trim', 'email'],
        password: ['required', 'string'],
    }

    static paramsBuilder = (ctx) => ({
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    })

    async execute({ name, email, password }) {
        const user = await RepoUser.getUserByEmail(email)
        if (user.length) {
            throw new UserAlreadyExists()
        }

        await RepoUser.createUser(name, email, password)

        return {
            data: {
                msg: 'created'
            },
            code: 201,
        }
    }
}

export default UserRegister

import Exe from '../../helper/router/Exe'

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
        // firebase auth throws error if account already exists
        await this.registerUser(email, phone, password, name)

        return {
            data: {
                msg: 'created'
            },
            code: 201,
        }
    }

    async registerUser(email = "user@example.com",
                       phone = "+11234567890",
                       password = "secretPassword",
                       displayName = "John Doe") {
        return this.context.fireadmin.auth().createUser({
            email,
            emailVerified: false,
            phoneNumber: phone,
            password,
            displayName,
            // photoURL: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
            disabled: false
        })
    }
}

export default UserRegister

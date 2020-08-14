import Exe from '../../helper/router/Exe'

class Ping extends Exe {
    static validationRules = {
        test: 'required',
    }

    static paramsBuilder = (ctx) => ({
        test: ctx.query.test
    })

    async execute(params) {
        console.log(params)
        return {
            data: {
                msg: 'Pong'
            },
            code: 201,
        }
    }
}

export default Ping

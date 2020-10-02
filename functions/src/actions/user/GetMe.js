import Exe from '../../helper/router/Exe';

class GetMe extends Exe {
    static paramsBuilder = (ctx) => ({
        userRecord: ctx.state.userRecord,
    })

    async execute({ userRecord }) {
        return {
            data: {
                userRecord,
            }
        }
    }
}

export default GetMe

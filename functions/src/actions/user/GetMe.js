import Exe from '../../helper/router/Exe';

class GetMe extends Exe {
    static paramsBuilder = (ctx) => ({
        userRecord: ctx.state.userRecord,
    })

    async execute({ userRecord }) {
        console.log('userRecord', userRecord)
        return {
            data: {
                userRecord: userRecord,
            }
        }
    }
}

export default GetMe

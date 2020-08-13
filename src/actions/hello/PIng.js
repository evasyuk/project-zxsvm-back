import Exe from '../../helper/router/Exe'

class Ping extends Exe {
    async execute() {
        return {
            data: {
                msg: 'Pong'
            },
            code: 201,
            headers: {
                'Authorization': 'mest'
            },
            type: 'stub'
        }
    }
}

export default Ping

import ErrorNonTraceable from './ErrorNonTraceable'

class WrongArgument extends ErrorNonTraceable {
    constructor(value = null) {
        super(`wrong argument [${value ? `${value}` : ''}]`);
    }
}

export default WrongArgument

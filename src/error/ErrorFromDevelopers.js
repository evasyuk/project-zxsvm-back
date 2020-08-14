import ErrorNonTraceable from './ErrorNonTraceable'

class ErrorFromDevelopers extends ErrorNonTraceable {
    constructor(value = null) {
        super(`error from developer [${value ? `${value}` : ''}]`);
    }
}

export default ErrorFromDevelopers

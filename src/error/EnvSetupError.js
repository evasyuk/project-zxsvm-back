import ErrorNonTraceable from './ErrorNonTraceable'

class EnvSetupError extends ErrorNonTraceable {
    constructor(value = null) {
        super(`environment setup error[${value ? `${value}` : ''}]`);
    }
}

export default EnvSetupError

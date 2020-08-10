import ErrorNonTraceable from './ErrorNonTraceable'

class NotInitialized extends ErrorNonTraceable {
    constructor(value = null) {
        super(`module not initialized[${value ? `${value}` : ''}]`);
    }
}

export default NotInitialized

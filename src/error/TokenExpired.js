import ErrorNonTraceable from './ErrorNonTraceable'

class TokenExpired extends ErrorNonTraceable {
    constructor() {
        super("token expired");
    }
}

export default TokenExpired

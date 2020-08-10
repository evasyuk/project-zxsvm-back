import ErrorNonTraceable from './ErrorNonTraceable'

class UserAlreadyExists extends ErrorNonTraceable {
    constructor() {
        super("user already exists");
    }
}

export default UserAlreadyExists

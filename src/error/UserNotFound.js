import ErrorNonTraceable from './ErrorNonTraceable'

class UserNotFound extends ErrorNonTraceable {
    constructor() {
        super("user not found");
    }
}

export default UserNotFound

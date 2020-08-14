import ErrorNonTraceable from './ErrorNonTraceable'

class UserWrongCredentials extends ErrorNonTraceable {
    constructor() {
        super("wrong credentials");
    }
}

export default UserWrongCredentials

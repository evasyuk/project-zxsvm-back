class ErrorNonTraceable extends Error {
    constructor(message = "runtime error") {
        super(message);
    }
}

export default ErrorNonTraceable

exports.NotFoundError = class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

exports.UnauthorizedError = class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

exports.InvalidUserInput = class InvalidUserInput extends Error {
    constructor(message) {
        super(message);
        this.status = 422;
    }
}

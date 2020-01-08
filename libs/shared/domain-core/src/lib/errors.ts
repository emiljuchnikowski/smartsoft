export class DomainValidationError extends Error {
    constructor(msg) {
        super(msg);
    }
}

export class DomainForbiddenError extends Error {
    constructor(msg) {
        super(msg);
    }
}

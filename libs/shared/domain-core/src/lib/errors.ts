export class DomainValidationError extends Error {
    type = DomainValidationError;

    constructor(msg) {
        super(msg);
    }
}

export class DomainForbiddenError extends Error {
    type = DomainForbiddenError;

    constructor(msg) {
        super(msg);
    }
}

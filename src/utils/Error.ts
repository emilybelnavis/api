export class InvalidVersionTagError extends Error {
    constructor() {
        super();
        this.name = "Invalid Version Tag";
        this.message = "Version tag retrieved is invalid."
    }
}

export class NoVersionTagError extends Error {
    constructor() {
        super();
        this.name = "No Version Tag Error"
        this.message = "Could not find any version tag."
    }
}

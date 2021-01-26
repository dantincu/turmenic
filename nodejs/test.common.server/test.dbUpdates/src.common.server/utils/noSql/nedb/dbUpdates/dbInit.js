import { DbVersionUpdaterOptions } from '../dbUpdaterOptions.js';

export class DbInit {
    constructor({
        toDbVrs,
        onComplete
    }) {
        if (!toDbVrs || !onComplete) {
            throw new Error("Invalid db init parameters!");
        }

        this.toDbVrs = toDbVrs;
        this.onComplete = onComplete;
    }

    run() {
    }
}
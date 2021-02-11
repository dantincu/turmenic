import { DbVersionUpdaterOptions } from '../dbUpdaterOptions.js';

export class DbInit {
    constructor({
        toDbVrs,
        oncomplete
    }) {
        if (!toDbVrs || !oncomplete) {
            throw new Error("Invalid db init parameters!");
        }

        this.toDbVrs = toDbVrs;
        this.oncomplete = oncomplete;
    }

    run() {
    }
}
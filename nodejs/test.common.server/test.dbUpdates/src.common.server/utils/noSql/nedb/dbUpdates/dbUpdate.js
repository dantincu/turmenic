import { DbVersionUpdaterOptions } from '../dbUpdaterOptions.js';

export class DbUpdate {
    constructor({
        fromDbVrs,
        toDbVrs,
        oncomplete,
        nextUpdateOpts,
        getNextInstance
    }) {
        if (!fromDbVrs || !toDbVrs || !oncomplete) {
            throw new Error("Invalid db update parameters!")
        }

        this.fromDbVrs = fromDbVrs;
        this.toDbVrs = toDbVrs;
        this.oncomplete = oncomplete;
        this.getNextInstance = getNextInstance;
        this.nextUpdateOpts = nextUpdateOpts;
    }

    run() {
    }

    runNext() {
        let nextUpdateInstance = this.getNextInstance?.call(this, this.nextUpdateOpts);
        nextUpdateInstance?.run();
    }

    updateCompleted() {
        this.oncomplete?.call(this);
        this.runNext();
    }
}
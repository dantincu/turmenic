import { dbContainer } from './dbContainer.js';
import { dbVersion } from './dbVersion.js';
import { getDbInit, getDbUpdate } from './dbUpdates/index.js';

export class DbVersionUpdater {
    constructor() {
    }

    loadDbUpdateData(opts) {
        console.log("Loading db updates...");
    }

    assureDbIsUpToDate(opts) {
        dbVersion.assertDbIsUptodate({ ...opts, throwIfNotUpToDate: false, oncomplete: (isUptodate, opts) => {
                if (isUptodate === false) {
                    this.loadDbUpdateData(opts);
                    this.updateDb({
                        fromDbVrs: opts.fromDbVrs,
                        toDbVrs: opts.toDbVrs,
                        oncomplete: opts.oncomplete
                    });
                }
            }
        });
    }

    updateDb(opts) {
        console.log("Updating the database...");
        console.log("From database version: ", opts.fromDbVrs)
        console.log("To database version: ", opts.toDbVrs)

        if (!opts.fromDbVrs) {
            this.performDbInit(opts);
        } else {
            this.performDbUpdate(opts);
        }
    }

    addDbInitData(opts) {
        console.log("Adding db init data...");
    }

    performDbInit(opts) {
        this.addDbInitData(opts);
        console.log("Performing database initialization...");
        
        let dbInit = getDbInit(opts);
        this.runDbInit(opts, dbInit);
    }

    runDbInit(opts, dbInit) {
        let getInitInstance = dbInit.getInstance;
        delete dbInit.getInstance;

        let initInstance = getInitInstance.call(this, { ...dbInit, oncomplete: () => {
                dbInit.oncomplete.call(dbInit);
                opts.oncomplete?.call(this);
            }
        });

        initInstance.run();
    }

    addDbUpdateData(opts) {
        console.log("Adding db update data...");
    }

    performDbUpdate(opts) {
        this.addDbUpdateData(opts);
        console.log("Performing database update...");
        let dbUpdatesChain = getDbUpdate(opts);

        this.registerFinalCallback(opts, dbUpdatesChain);
        // this.linkUpdateChain(opts, dbUpdatesChain);
        this.runFirstUpdate(opts, dbUpdatesChain[0]);
    }

    registerFinalCallback(opts, dbUpdatesChain) {
        let lastDbUpdate = dbUpdatesChain[dbUpdatesChain.length - 1];
        let lastCompleteCallback = lastDbUpdate.oncomplete;

        lastDbUpdate.oncomplete = () => {
            lastCompleteCallback?.call(lastDbUpdate);
            opts.oncomplete?.call(this);
        }
    }

    linkUpdateChain(opts, dbUpdatesChain) {
        for (let i = dbUpdatesChain.length - 2; i >= 0; i--) {
            let currentUpdate = dbUpdatesChain[i];
            let nextUpdate = dbUpdatesChain[i + 1];

            currentUpdate.getNextInstance = nextUpdate.getInstance;
            currentUpdate.nextUpdateOpts = this.getNextUpdateOpts(nextUpdate);
        }
    }

    getNextUpdateOpts(nextUpdate) {
        let nextUpdateOpts = {
            fromDbVrs: nextUpdate.fromDbVrs,
            toDbVrs: nextUpdate.toDbVrs,
            oncomplete: nextUpdate.oncomplete,
            getNextInstance: nextUpdate.getNextInstance,
            nextUpdateOpts: nextUpdate.nextUpdateOpts
        };

        return nextUpdateOpts;
    }

    runFirstUpdate(opts, firstDbUpdate) {
        let getFirstUpdateInstance = firstDbUpdate.getInstance;
        delete firstDbUpdate.getInstance;

        let updateInstance = getFirstUpdateInstance.call(firstDbUpdate, firstDbUpdate);
        updateInstance.run();
    }
}

import { dbContainer } from './dbContainer.js';
import { dbVersion } from './dbVersion.js';
import { DbVersionUpdaterOptions } from './dbUpdaterOptions.js';
import { getDbInit, getDbUpdate } from './dbUpdates/index.js';

export class DbVersionUpdater {
    constructor() {
    }

    loadDbUpdateData(opts) {
        console.log("Loading db updates...");
    }

    assureDbIsUpToDate(opts) {
        dbVersion.assertDbIsUptodate({ ...opts, oncomplete: (isUptodate, opts) => {
                if (isUptodate === false) {
                    this.loadDbUpdateData(opts);
                    this.updateDb({
                        fromDbVrs: opts.currentDbVrs,
                        toDbVrs: opts.latestDbVrs,
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

        if (!opts.currentDbVrs) {
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

        let initInstance = dbInit.getInstance.call(this, { ...dbInit, oncomplete: () => {
                dbInit.oncomplete.call(dbInit);
                opts.oncomplete?.call(this);
            }
        });
    }

    addDbUpdateData(opts) {
        console.log("Adding db update data...");
    }

    performDbUpdate(opts) {
        this.addDbUpdateData(opts);
        console.log("Performing database update...");
        let dbUpdatesChain = getDbUpdate(opts);

        this.registerFinalCallback(opts, dbUpdatesChain);
        this.runFirstUpdate(opts, dbUpdatesChain[i]);
    }

    registerFinalCallback(opts, dbUpdatesChain) {
        let lastDbUpdate = dbUpdatesChain[dbUpdatesChain.length - 1];
        let lastCompleteCallback = lastDbUpdate.oncomplete;

        lastDbUpdate.oncomplete = () => {
            lastCompleteCallback?.call(lastDbUpdate);
            opts.oncomplete?.call(this);
        }
    }

    runFirstUpdate(opts, firstDbUpdate) {
        let getFirstUpdateInstance = firstDbUpdate.getInstance;
        delete firstDbUpdate.getInstance;

        let updateInstance = getFirstUpdateInstance.call(firstDbUpdate, firstDbUpdate);
        updateInstance.run();
    }
}

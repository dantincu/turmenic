import { dbContainer } from './dbContainer.js';
import { dbVersion } from './dbVersion.js';
import { DbVersionUpdaterOptions } from './dbUpdaterOptions.js';

export class DbVersionUpdater {
    assureDbUpToDate(opts) {
        dbVersion.assertDbIsUptodate({ ...opts, oncomplete: (isUptodate, opts) => {
                if (isUptodate === false) {
                    this.updateDb(opts);
                }
            }
        });
    }

    updateDb(opts) {
        console.log("Updating the database...");
        console.log("Current database version", opts.currentDbVrs)
        console.log("Latest database version", opts.latestDbVrs)

        if (!opts.currentDbVrs) {
            this.performDbInit(opts);
        } else {
            this.performDbUpdate(opts);
        }
    }

    performDbInit(opts) {
        console.log("Performing database initialization...");
    }

    performDbUpdate(opts) {
        console.log("Performing database update...");
    }
}

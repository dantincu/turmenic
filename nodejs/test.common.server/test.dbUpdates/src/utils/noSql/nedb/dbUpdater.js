import { dbContainer } from '../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { DbVersionUpdater } from '../../../../src.common.server/utils/noSql/nedb/dbUpdater.js';
import { DbVersionUpdaterOptions } from '../../../../src.common.server/utils/noSql/nedb/dbUpdaterOptions.js';
import { addDbInit, addDbUpdate } from './../../../../src.common.server/utils/noSql/nedb/dbUpdates/index.js';
import { AppDbInit } from './dbUpdates/dbInit.js'
import { AppDbUpdate } from './dbUpdates/dbUpdate.js'

export class AppDbVersionUpdater extends DbVersionUpdater {
    constructor() {
        super();
    }

    addDbInitDataItem(toDbVrs) {
        addDbInit({ toDbVrs: toDbVrs, getInstance: dbInit => new AppDbInit(dbInit), oncomplete: () => { console.log("Finished db init") } });
    }

    addDbInitData(opts) {
        super.addDbInitData(opts);

        this.addDbInitDataItem("0.0.1");
        this.addDbInitDataItem("0.0.4");
        this.addDbInitDataItem("0.0.5");
        this.addDbInitDataItem("0.0.9");
    }

    addDbUpdateDataItem(fromDbVrs, toDbVrs) {
        addDbUpdate({ fromDbVrs: fromDbVrs, toDbVrs: toDbVrs, getInstance: dbInit => new AppDbUpdate(dbInit), oncomplete: () => { console.log("Finished db update") } });
    }

    addDbUpdateData(opts) {
        super.addDbUpdateData(opts);

        this.addDbUpdateDataItem("0.0.1", "0.0.2");
        this.addDbUpdateDataItem("0.0.2", "0.0.3");
        this.addDbUpdateDataItem("0.0.3", "0.0.4");
        this.addDbUpdateDataItem("0.0.4", "0.0.5");
    }

    addDbInitItem({ toDbVrs }) {
        addDbInit({ toDbVrs: toDbVrs, getInstance: (opts) => new AppDbInit(opts) });
    }

    addDbUpdateItem({ fromDbVrs, toDbVrs }) {
        addDbInit({ fromDbVrs: fromDbVrs, toDbVrs: toDbVrs, getInstance: (opts) => new AppDbUpdate(opts) });
    }
}


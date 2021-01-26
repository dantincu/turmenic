import { dbContainer } from '../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { DbVersionUpdater } from '../../../../src.common.server/utils/noSql/nedb/dbUpdater.js';
import { DbVersionUpdaterOptions } from '../../../../src.common.server/utils/noSql/nedb/dbUpdaterOptions.js';
import { addDbInit, addDbUpdate } from './../../../../src.common.server/utils/noSql/nedb/dbUpdates/index.js';
import { AppDbInit } from './dbUpdates/dbInit.js'

export class AppDbVersionUpdater extends DbVersionUpdater {
    constructor() {
        super();
    }

    addDbInitData(opts) {
        super.addDbInitData(opts);

        addDbInit({ toDbVrs: "0.0.1" });
        addDbInit({ toDbVrs: "0.0.4" });
        addDbInit({ toDbVrs: "0.0.5" });
        addDbInit({ toDbVrs: "0.0.9" });
    }

    addDbUpdateData(opts) {
        super.addDbUpdateData(opts);

        addDbUpdate({ fromDbVrs: "0.0.1", toDbVrs: "0.0.2" });
        addDbUpdate({ fromDbVrs: "0.0.2", toDbVrs: "0.0.3" });
        addDbUpdate({ fromDbVrs: "0.0.3", toDbVrs: "0.0.4" });
        addDbUpdate({ fromDbVrs: "0.0.4", toDbVrs: "0.0.5" });
        addDbUpdate({ fromDbVrs: "0.0.5", toDbVrs: "0.0.6" });
    }

    addDbInitItem({ toDbVrs }) {
        addDbInit({ toDbVrs: toDbVrs, getInstance: (opts) => new AppDbInit(opts) });
    }

    addDbUpdateItem({ fromDbVrs, toDbVrs }) {
        addDbInit({ fromDbVrs: fromDbVrs, toDbVrs: toDbVrs, getInstance: (opts) => new AppDbUpdate(opts) });
    }
}


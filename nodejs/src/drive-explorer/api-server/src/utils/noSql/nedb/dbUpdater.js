import { dbContainer } from '../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { DbVersionUpdater } from '../../../../src.common.server/utils/noSql/nedb/dbUpdater.js'

export class AppDbVersionUpdater extends DbVersionUpdater {
    performDbInit(opts) {
        super.performDbInit(opts);
    }

    performDbUpdate(opts) {
        super.performDbUpdate(opts);
    }

    loadDbUpdateData() {
        super.loadDbUpdateData();
    }
}


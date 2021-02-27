import { dbContainer } from '../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { addDbInit, addDbUpdate } from './../../../../src.common.server/utils/noSql/nedb/dbUpdates/index.js';
import { DbVersionUpdater } from '../../../../src.common.server/utils/noSql/nedb/dbUpdater.js'

export class AppDbVersionUpdater extends DbVersionUpdater {
    performDbInit(opts) {
        super.performDbInit(opts);

        addDbInit();
    }

    performDbUpdate(opts) {
        super.performDbUpdate(opts);
    }

    loadDbUpdateData() {
        super.loadDbUpdateData();
    }
}

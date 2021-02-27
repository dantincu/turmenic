import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbUpdate } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbUpdate.js';

export class dbUpdate_from_0_0_1_to_0_0_2 extends DbUpdate {
    constructor(opts) {
        super(opts);
    }

    performDbUpdate(dbCtr, dbMetadataDb) {
    }
}
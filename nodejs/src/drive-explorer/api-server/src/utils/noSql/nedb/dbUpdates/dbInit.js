import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbInit } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbInit.js';

export class AppDbInit extends DbInit {
    constructor(opts) {
        super(opts);
    }

    performDbInit(dbCtr, dbMetadataDb) {
    }
}
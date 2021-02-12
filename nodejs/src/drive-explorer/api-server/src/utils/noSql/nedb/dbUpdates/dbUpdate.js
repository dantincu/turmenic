import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbUpdate } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbUpdate.js';

export class AppDbUpdate extends DbUpdate {
    constructor(opts) {
        super(opts);
    }

    
}
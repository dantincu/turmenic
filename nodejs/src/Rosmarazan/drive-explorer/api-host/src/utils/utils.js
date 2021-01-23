import { dbContainer } from '../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { dbVersion } from '../../src.common.server/utils/noSql/nedb/dbVersion.js';
import { cfg } from '../../src.common.server/utils/appSettings/moduleConfig.js';







export const createStore = (initDb = false) => {
    dbVersion.assureUpToDate();


};
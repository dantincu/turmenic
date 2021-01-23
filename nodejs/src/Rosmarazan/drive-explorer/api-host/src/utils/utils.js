import { dbContainer } from '../../src.common.server/utils/noSql/nedb/dbContainer.js';

export const createStore = (initDb = false) => {
    
    let dbMetadata = dbContainer.instance.loadDatabase({ dbName: "test" });

};
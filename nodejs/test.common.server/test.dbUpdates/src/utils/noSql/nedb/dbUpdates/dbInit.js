import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbInit } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbInit.js';

export class AppDbInit extends DbInit {
    constructor(opts) {
        super(opts);
    }

    run() {
        const dbCtr = dbContainer.instance;
        const dbList = dbCtr.dbList;

        this.getCurrentDbVersionData(dbCtr, this.performDbInit);
    }

    getCurrentDbVersionData(dbCtr, callback) {
        let dbMetadataDb = dbCtr.loadDatabase({ dbName: "metadata" });
        let dbMetadata = dbMetadataDb.find({}).sort({ timeStamp: -1 }).limit(1).exec((err, docs) => {
            if (err) {
                console.error("Error while loading the database version", err);
            } else {
                if (docs.length !== 0) {
                    throw new Error("Error while performing db init! The database appears to have already been initialized, the current version being " + docs[0].dbVersion);
                } else {
                    callback.call(this, dbCtr, dbMetadataDb);
                }
            }
        });
    }

    performDbInit(dbCtr, dbMetadataDb) {
        const dbMetadata = {
            timeStamp: Date.now().getTime(),
            dbVersion: this.toDbVrs
        };

        dbMetadataDb.insert(dbMetadata, (err, newDoc) => {
            if (err) {
                console.error("Error while inserting the latest database version metadata record!", err);
            }
        });
    }
}
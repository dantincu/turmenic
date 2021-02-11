import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbUpdate } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbUpdate.js';

export class AppDbUpdate extends DbUpdate {
    constructor(opts) {
        super(opts);
    }

    run() {
        const dbCtr = dbContainer.instance;
        const dbList = dbCtr.dbList;

        this.getCurrentDbVersionData(dbCtr, this.performDbUpdate);
    }

    getCurrentDbVersionData(dbCtr, callback) {
        let dbMetadataDb = dbCtr.loadDatabase({ dbName: "metadata" });
        let dbMetadata = dbMetadataDb.find({}).sort({ timeStamp: -1 }).limit(1).exec((err, docs) => {
            if (err) {
                console.error("Error while loading the database version", err);
            } else {
                if (docs.length === 0) {
                    throw new Error("Error while performing db update! The database appears to have not been initialized yet. Please run db init first");
                } else if (docs[0].dbVersion !== this.fromDbVrs) {
                    throw new Error("Error while performing db update! The current database version appears to be different than the one that this updater can run agasinst")
                } else {
                    callback.call(this, dbCtr, dbMetadataDb);
                }
            }
        });
    }

    performDbUpdate(dbCtr, dbMetadataDb) {
        const dbMetadata = {
            timeStamp: new Date().getTime(),
            dbVersion: this.toDbVrs
        };

        dbMetadataDb.insert(dbMetadata, (err, newDoc) => {
            if (err) {
                console.error("Error while inserting the latest database version metadata record!", err);
            } else {
                console.log("Database update from version " + this.fromDbVrs + " to version " + this.toDbVrs + " completed successfully");
                this.updateCompleted();
            }
        });
    }
}
import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';

export class DbInit {
    constructor({
        toDbVrs,
        oncomplete
    }) {
        if (!toDbVrs || !oncomplete) {
            throw new Error("Invalid db init parameters!");
        }

        this.toDbVrs = toDbVrs;
        this.oncomplete = oncomplete;
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

    run() {
        const dbCtr = dbContainer.instance;
        const dbList = dbCtr.dbList;

        this.getCurrentDbVersionData(dbCtr, this.performDbInit);
    }

    performDbInit(dbCtr, dbMetadataDb) {
        const dbMetadata = {
            timeStamp: new Date().getTime(),
            dbVersion: this.toDbVrs
        };

        dbMetadataDb.insert(dbMetadata, (err, newDoc) => {
            if (err) {
                console.error("Error while inserting the latest database version metadata record!", err);
            } else {
                this.oncomplete?.call(this);
                console.log("Database init completed successfully");
            }
        });
    }
}
import { cfg } from '../../appSettings/moduleConfig.js';
import { dbContainer } from './dbContainer.js';
import { compareVersions } from '../../pckgUtils.js'

export class DbVersionData {
    constructor() {
        this.dbVersion = null;
        this.timeStamp = null;
    }
}

const dbCtr = dbContainer.instance;
const dbList = dbCtr.dbList;

export class DbVersionLoader {
    constructor() {
    }

    getLatestDbVersionData(latestDbVersionData) {
        
        latestDbVersionData = latestDbVersionData || cfg.getOrLoad({
            mn: "nedb",
            obj: new DbVersionData()
        }).cfg.dbVersion;
        
        return latestDbVersionData;
    }

    getCurrentDbVersionData(oncomplete) {
        let dbMetadataDb = dbCtr.loadDatabase({ dbName: "metadata" });
        let dbMetadata = dbMetadataDb.find({}).sort({ timeStamp: -1 }).limit(1).exec((err, docs) => {
            if (err) {
                console.error("Error while loading the database version", err);
            }
            else if (docs && docs[0]) {
                console.log("Database version: " + docs[0]);
            } else {
                console.log("No database version record has been found");
            }

            oncomplete = oncomplete || ((err, docs) => {});
            oncomplete(err, docs);
        });
    }

    isDbUptodate(opts) {
        let isUpToDate = !!opts.currentDbVrs;

        if (isUpToDate) { 
            isUpToDate = compareVersions(
                opts.currentDbVrs,
                opts.latestDbVrs) >= 0;
        }

        return isUpToDate;
    }

    assertDbIsUptodate(opts) {
        opts.latestDbVrs = this.getLatestDbVersionData(opts.latestDbVrs);
        this.getCurrentDbVersionData((err, docs) => {
            if (docs) {
                opts.currentDbVrs = docs[0]?.dbVersion;
            }

            let isUptodate = this.isDbUptodate(opts);

            if (typeof(opts.oncomplete) === "function") {
                opts.oncomplete(isUptodate, opts);
            } else if (opts.oncomplete === true && isUptodate !== true) {
                throw new Error("Database is not up to date! Try performing a database update prior to running the api server!");
            }
        });
    }
}

export const dbVersion = new DbVersionLoader();
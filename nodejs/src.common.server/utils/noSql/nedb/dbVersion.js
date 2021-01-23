import { cfg } from '../../appSettings/moduleConfig.js';
import { dbContainer } from './dbContainer.js';
import { compareVersions } from '../../text-utils.js'

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

    getLatestDbVersionData(reqDbVersionData) {
        reqDbVersionData = reqDbVersionData || cfg.getOrLoad({
            mn: "nedb",
            obj: new DbVersionData()
        }).cfg;

        return reqDbVersionData;
    }

    getCurrentDbVersionData(oncomplete) {
        let dbMetadataDb = dbCtr.loadDatabase({ dbName: "metadata" });
        let dbMetadata = dbMetadataDb.find({}).sort({ timeStamp: -1 }).limit(1).exec((err, docs) => {
            if (err) {
                console.error("Error while loading the database version", err);
            }

            oncomplete = oncomplete || ((err, docs) => {});
            oncomplete(err, docs);
        });
    }

    isDbUpToDate(opts) {
        let isUpToDate = compareVersions(opts.currentDbVrs, opts.latestDbVrs) >= 0;
        return isUpToDate;
    }

    updateDb(opts) {
        let dbVersionUpdater = new DbVersionUpdater(opts);
        dbVersionUpdater.updateDb();
    }

    assureUpToDate(opts) {
        opts.latestDbVrs = this.getLatestDbVersionData(opts.latestDbVrs);
        this.getCurrentDbVersionData((err, docs) => {
            if (docs && docs[0]) {
                opts.currentDbVrs = docs[0];
                if (this.isDbUpToDate(opts) === false) {
                    this.updateDb(opts)
                }
            }
        });
    }
}

export class DbVersionUpdaterOptions {
    constructor() {
        this.currentDbVrs = null;
        this.latestDbVrs = null;
        this.oncomplete = null;
    }
}

export class DbVersionUpdater {
    constructor(opts) {
        this.opts = opts;
    }

    updateDb() {

    }
}

export const dbVersion = new DbVersionLoader();
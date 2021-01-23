import path from 'path';
import Datastore from 'nedb';
import { buildInTypes, throwIfNotTypeof } from '../../typeChecking/throwIfNotTypeof.js';
import { envConfig, envBaseDir } from '../../appSettings/envConfig.js';

export class DbContainer {
    constructor(opts) {
        throwIfNotTypeof(opts, buildInTypes.object);
        this.dbDataDirPath = opts.dbDataDirPath;

        this.dbList = {
        }
    }

    getDatabaseFilePath(opts) {
        let dbFileName = opts.dbFileName || opts.dbName + ".db";
        let dbFilePath = path.join(this.dbDataDirPath, dbFileName);

        return dbFilePath;
    }

    loadDatabase(opts) {
        throwIfNotTypeof(opts, buildInTypes.object);
        let dbFilePath = this.getDatabaseFilePath(opts);

        let dbCntr = {
            db: null
        }

        dbCntr.db = new Datastore({ filename: dbFilePath, autoload: true, onload: this.getOnloadcallback(dbCntr, opts) })
        return dbCntr.db;
    }

    getOnloadcallback(dbCntr, opts) {
        
        let callback = err => {
            if (err) {
                console.error("Error when tried to load database " + dbName + " from file " + filePath, err);
            } else {
                this.dbList[opts.dbName] = dbCntr.db;
                console.log(opts.dbName + " database loaded successfully");
            }

            if (opts.onload) {
                opts.onload(dbCntr.db, opts.dbName);
            }
        };

        return callback;
    }
}

export class DbContainerWrapper {
    constructor() {
        this._dbDirName = "nedb-data";
        this._instance = null;
    }

    get instance() {
        if (this._instance == null) {
            this._instance = new DbContainer({ dbDataDirPath: envConfig.appEnv.getEnvRelPath(envBaseDir.data, [ this._dbDirName ]) });
        }

        return this._instance;
    }

    set dbDirName(val) {
        this._dbDirName = val;
    }
}

export const dbContainer = new DbContainerWrapper();
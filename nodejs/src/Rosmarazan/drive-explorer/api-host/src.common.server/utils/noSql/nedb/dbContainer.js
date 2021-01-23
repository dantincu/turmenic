import path from 'path';
import Datastore from 'nedb';
import { buildInTypes, throwIfNotTypeof } from '../../typeChecking/throwIfNotTypeof.js';

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
    
                if (opts.onload) {
                    opts.onload(dbCntr.db, opts.dbName);
                }
            }
        };

        return callback;
    }
}

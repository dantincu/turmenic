import { envBaseDir, envConfig } from '../../../appSettings/envConfig.js';
import { loadJsonFromFile, loadJsonInto } from '../../../fileSystem/json.js';
import { DbVersionUpdaterOptions } from '../dbUpdaterOptions.js';
import { assureVersionIsValid, compareVersions } from '../../../pckgUtils.js';

const assureDbInitIsValid  = (opts) => {
    if (!opts.toDbVrs) {
        throw new Error("Invalid db init options: latest db version is required!")
    }

    assureVersionIsValid(opts.toDbVrs, 3);
    assureDbInitNoDuplicate(opts);
}

const assureDbInitNoDuplicate = (opts) => {
    let dbInit = getDbInitOrNull(opts);

    if (dbInit) {
        throw new Error("Invalid db init options: a duplicate has been found!")
    }
}

const getDbInitOrNull = (opts) => {
    let retDbInit = null;

    for (let key in dbInitList) {
        let dbInit = dbInitList[key];

        if (dbInit.toDbVrs === opts.toDbVrs) {
            retDbInit = dbInit;
            break;
        }
    }

    return retDbInit;
}

const assureDbUpdateIsValid  = (opts) => {
    if (!opts.toDbVrs || !opts.fromDbVrs) {
        throw new Error("Invalid db update options: latest and current db versions are required!")
    }

    assureVersionIsValid(opts.toDbVrs, 3);
    assureVersionIsValid(opts.fromDbVrs, 3);

    if (compareVersions(opts.fromDbVrs, opts.toDbVrs) >= 0) {
        throw new Error("Invalid db update options: current db version must be older than the latest db version!")
    }

    assureDbUpdateNoDuplicate(opts);
}

const assureDbUpdateNoDuplicate = (opts) => {
    assureVersionIsValid(opts.toDbVrs, 3);
    assureVersionIsValid(opts.fromDbVrs, 3);

    for (let key in dbUpdateList) {
        let dbUpdate = dbUpdateList[key];

        if (dbUpdate.toDbVrs === opts.toDbVrs && dbUpdate.fromDbVrs === opts.fromDbVrs) {
            throw new Error("Invalid db update options: a duplicate has been found!");
        }
    }
}

const dbUpdateList = [];
const dbInitList = [];

class UpdatesData {
    constructor() {
        this.updatesChain = null;
    }
}

const getUpdatesFilePath = () => {
    let filePath = envConfig.appEnv.getEnvRelPath(envBaseDir.data, [ 'nedb', 'db-updates', 'updatesChain.json' ]);
    return filePath;
}

const assertUpdateIsValid = ({ fromDbVrs, toDbVrs }, update) => {
    let retVal = fromDbVrs === update.fromDbVrs;
    retVal = retVal && toDbVrs === update.toDbVrs;

    if (retVal !== true) {
        throw new Error("Could not perform db update! The loaded updates are invalid!");
    }
}

const assertUpdatesAreValid = (opts, updatesData) => {
    let fromDbVrs = opts.currentDbVrs;
    let toDbVrs = null;

    for (let key in updatesData.updatesChain) {
        let update = updatesData[key];
        toDbVrs = update.toDbVrs;

        assertUpdateIsValid({ fromDbVrs: fromDbVrs, toDbVrs: toDbVrs }, update);

        fromDbVrs = toDbVrs;
    }
}

const loadUpdates = (opts) => {
    let filePath = getUpdatesFilePath();
    let updatesData = new UpdatesData();

    loadJsonInto(filePath, updatesData);
    assertUpdatesAreValid(opts, updatesData);

    return updatesData;
}

const getDbUpdatesChain = (opts) => {
    let dbUpdatesChain = [];
    let updatesData = loadUpdates(opts);

    for (let key in updatesData) {
        let update = updatesData[key];

        let dbUpdate = dbUpdateList.find((val, idx, arr) => {
            let retVal = val.fromDbVrs === update.fromDbVrs;
            retVal = retVal && val.toDbVrs === update.toDbVrs;

            return retVal;
        });

        if (!dbUpdate) {
            throw new Error("Could not perform db update! Update from version " + opts.currentDbVrs + " to version " + opts.latestDbVrs + " could not be found!");
        }

        dbUpdatesChain.push(dbUpdate);
    }

    return dbUpdatesChain;
}

const cloneDbUpdatesChain = (dbUpdatesChain) => {
    let clonedDbUpdatesChain = dbUpdatesChain.map((dbUpdate, idx, arr) => {
        return {
            fromDbVrs: dbUpdate.fromDbVrs,
            toDbVrs: dbUpdate.toDbVrs,
            oncomplete: dbUpdate.oncomplete
        };
    })

    clonedDbUpdatesChain[0].getInstance = dbUpdatesChain[0].getInstance;

    for (let i = 0; i < clonedDbUpdatesChain.length; i++) {
        if (i < clonedDbUpdatesChain.length - 2) {
            clonedDbUpdatesChain[i].nextUpdateOpts = clonedDbUpdatesChain[i + 1];
            clonedDbUpdatesChain[i].getNextInstance = dbUpdatesChain[i + 1].getInstance;    
        }
    }

    return clonedDbUpdatesChain;
}

export const addDbUpdate = (opts) => {
    assureDbUpdateIsValid(opts);
    dbUpdateList.push(opts);
}

export const addDbInit = (opts) => {
    assureDbInitIsValid(opts);
    dbInitList.push(opts);
}

export const getDbUpdate = (opts) => {
    assureVersionIsValid(opts.latestDbVrs, 3);
    assureVersionIsValid(opts.currentDbVrs, 3);

    let dbUpdatesChain = getDbUpdatesChain(opts);
    dbUpdatesChain = cloneDbUpdatesChain(dbUpdatesChain);

    return dbUpdatesChain;
}

export const getDbInit = (opts) => {
    let retDbInit = getDbInitOrNull(opts);

    if (!retDbInit) {
        throw new Error("Could not perform db init! Init to version " + opts.latestDbVrs + " not found!")
    }

    return retDbInit;
}


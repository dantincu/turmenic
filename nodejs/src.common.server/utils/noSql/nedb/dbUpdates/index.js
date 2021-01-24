import { DbVersionUpdaterOptions } from '../dbUpdaterOptions.js';
import { assureVersionIsValid, compareVersions } from '../../../pckgUtils.js'

const assureDbInitIsValid  = (opts) => {
    if (!opts.latestDbVrs) {
        throw new Error("Invalid db init options: latest db version is required!")
    }

    assureVersionIsValid(opts.latestDbVrs, 3);

    if (getDbInit(opts)) {
        throw new Error("Invalid db init options: a duplicate has been found!")
    }
}

const assureDbUpdateIsValid  = (opts) => {
    if (!opts.latestDbVrs || !opts.currentDbVrs) {
        throw new Error("Invalid db update options: latest and current db versions are required!")
    }

    assureVersionIsValid(opts.latestDbVrs, 3);
    assureVersionIsValid(opts.currentDbVrs, 3);

    if (compareVersions(opts.currentDbVrs, opts.latestDbVrs) >= 0) {
        throw new Error("Invalid db update options: current db version must be older than the latest db version!")
    }

    assureDbUpdateNoDuplicate(opts);
}

const assureDbUpdateNoDuplicate = (opts) => {
    assureVersionIsValid(opts.latestDbVrs, 3);
    assureVersionIsValid(opts.currentDbVrs, 3);

    for (let key in dbUpdateList) {
        let dbUpdate = dbUpdateList[key];

        if (dbUpdate.latestDbVrs === opts.latestDbVrs && dbUpdate.currentDbVrs === opts.currentDbVrs) {
            throw new Error("Invalid db update options: a duplicate has been found!");
        }
    }
}

const getDbUpdateCandidateList = opts => {
    let dbUpdateCandidateList = [];

    for (let key in dbUpdateList) {
        let dbUpdate = dbUpdateList[key];

        if (dbUpdate.latestDbVrs === opts.latestDbVrs) {
            dbUpdateCandidateList.push(dbUpdate);
        }
    }

    dbUpdateCandidateList.sort((leftItem, rightItem) => compareVersions(leftItem.currentDbVrs, rightItem.currentDbVrs));
}

const dbUpdateList = [];

const dbInitList = [];

const getDbUpdateChain = (opts, dbUpdateCandidateList) => {
    let dbUpdateChain = [];

    
}

export const addDbUpdate = (opts) => {
    assureDbUpdateIsValid(opts);
}

export const addDbInit = (opts) => {
    assureDbInitIsValid(opts);
}

export const getDbUpdate = (opts) => {
    assureVersionIsValid(opts.latestDbVrs, 3);
    assureVersionIsValid(opts.currentDbVrs, 3);

    let dbUpdateCandidateList = getDbUpdateCandidateList(opts);

    while (dbUpdateCandidateList.length > 0) {
        let dbUpdateCandidate = dbUpdateCandidateList[dbUpdateCandidateList.length - 1];

        if (compareVersions(dbUpdateCandidate.currentDbVrs, opts.currentDbVrs) < 0) {
            dbUpdateCandidateList.pop();
        }
    }

    let dbUpdateChain = getDbUpdateChain(opts, dbUpdateCandidateList);
    return dbUpdateChain;
}

export const getDbInit = (opts) => {
    let retDbInit = null;

    assureVersionIsValid(opts.latestDbVrs, 3);

    for (let key in dbInitList) {
        let dbInit = dbInitList[key];

        if (dbInit.latestDbVrs === opts.latestDbVrs) {
            retDbInit = dbInit;
            break;
        }
    }
}


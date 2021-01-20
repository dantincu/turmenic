const path = require('path');
const fsPath = require('../fileSystem/path.js')
const { loadJsonInto } = require('../fileSystem/json.js')
const { appDataEnv } = require('../appDataEnv.js');

class EnvRootLocatorData {
    constructor() {
        this.envRootPath = null;
        this.useMachineDefaultAppDataDir = null;
        this.machineAppDataEnvDirRelPath = null;
    }

    getEnvRootPath() {
        let envRootPath = fsPath.absPathToPlatformStyle(this.envRootPath);

        if (this.useMachineDefaultAppDataDir) {
            envRootPath = appDataEnv.getAppDataRelDirPath([this.machineAppDataEnvDirRelPath]);
        }

        return envRootPath;
    }
}

class EnvRootLocator {
    constructor() {
        this.data = null;
        this.envRootPath = null;
    }

    getEnvRootRelPath(pathArray) {
        let relPath = path.join.apply(path, [this.envRootPath, ...pathArray]);
        return relPath;
    }
}

module.exports.EnvRootLocator = EnvRootLocator;

let envRootLocatorData = new EnvRootLocatorData();

let filePath = './src/utils/appSettings/env-root-locator.jsconfig.json';
let jsonData = Object.freeze(loadJsonInto(filePath, envRootLocatorData));

let envRootLocatorInstance = new EnvRootLocator();
envRootLocatorInstance.data = jsonData;
envRootLocatorInstance.envRootPath = envRootLocatorData.getEnvRootPath();

const envRootLocator = Object.freeze(envRootLocatorInstance);
module.exports.envRootLocator = envRootLocator;

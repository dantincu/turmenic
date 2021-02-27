import path from 'path';
import * as fsPath from '../fileSystem/path.js'
import { loadJsonInto } from '../fileSystem/json.js';
import { appDataEnv } from '../appDataEnv.js';
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

export class EnvRootLocator {
    constructor() {
        this.data = null;
        this.envRootPath = null;
    }

    getEnvRootRelPath(pathArray) {
        let relPath = path.join.apply(path, [this.envRootPath, ...pathArray]);
        return relPath;
    }
}

let envRootLocatorData = new EnvRootLocatorData();

let filePath = './src/utils/appSettings/env-root-locator.jsconfig.json';
let jsonData = Object.freeze(loadJsonInto(filePath, envRootLocatorData));

let envRootLocatorInstance = new EnvRootLocator();
envRootLocatorInstance.data = jsonData;
envRootLocatorInstance.envRootPath = envRootLocatorData.getEnvRootPath();

export const envRootLocator = Object.freeze(envRootLocatorInstance);


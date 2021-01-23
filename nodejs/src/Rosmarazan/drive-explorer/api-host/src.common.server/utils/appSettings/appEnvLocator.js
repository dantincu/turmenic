import path from 'path';
import { loadJsonInto } from '../fileSystem/json.js';
import { envRootConfig } from './envRootConfig.js';

class AppEnvLocatorData {
    constructor() {
        this.appEnvBaseRelPath = null;
        this.useDefaultEnvRootDir = null;
    }

    getAppEnvBaseRelPath() {
        let appEnvRelBasePath = this.appEnvBaseRelPath;

        if (this.useDefaultEnvRootDir) {
            appEnvRelBasePath = path.join(envRootConfig.nodejsRelDirPath, this.appEnvBaseRelPath);
        }

        return appEnvRelBasePath;
    }

    getAppEnvBasePath() {
        let appEnvBaseRelPath = this.getAppEnvBaseRelPath();
        let appEnvBasePath = path.join(envRootConfig.envRootPath, appEnvBaseRelPath);

        return appEnvBasePath;
    }
}

export class AppEnvLocator {
    constructor() {
        this.data = null;
        this.appEnvBasePath = null;
        this.appEnvBaseRelPath = null;
    }
}

const appEnvLocatorData = new AppEnvLocatorData();

let filePath = './src/utils/appSettings/app-env-locator.jsconfig.json';
let jsonData = Object.freeze(loadJsonInto(filePath, appEnvLocatorData));

let appEnvLocatorInstance = new AppEnvLocator();
appEnvLocatorInstance.data = jsonData;
appEnvLocatorInstance.appEnvBasePath = appEnvLocatorData.getAppEnvBasePath();
appEnvLocatorInstance.appEnvBaseRelPath = appEnvLocatorData.getAppEnvBaseRelPath();

export const appEnvLocator = Object.freeze(appEnvLocatorInstance);


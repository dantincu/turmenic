const path = require('path');
const { loadJsonInto } = require('../fileSystem/json.js');
const { envRootConfig } = require('./envRootConfig.js');

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

class AppEnvLocator {
    constructor() {
        this.data = null;
        this.appEnvBasePath = null;
        this.appEnvBaseRelPath = null;
    }
}

module.exports.AppEnvLocator = AppEnvLocator;

const appEnvLocatorData = new AppEnvLocatorData();

let filePath = './src/utils/appSettings/app-env-locator.jsconfig.json';
let jsonData = Object.freeze(loadJsonInto(filePath, appEnvLocatorData));

let appEnvLocatorInstance = new AppEnvLocator();
appEnvLocatorInstance.data = jsonData;
appEnvLocatorInstance.appEnvBasePath = appEnvLocatorData.getAppEnvBasePath();
appEnvLocatorInstance.appEnvBaseRelPath = appEnvLocatorData.getAppEnvBaseRelPath();

const appEnvLocator = Object.freeze(appEnvLocatorInstance);
module.exports.appEnvLocator = appEnvLocator;

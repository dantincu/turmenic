const { loadJsonInto } = require('../fileSystem/json.js');
const { envRootLocator } = require('./envRootLocator.js');

const filePath = envRootLocator.getEnvRootRelPath(["env-root.jsconfig.json"]);

class EnvRootConfig {
    constructor() {
        this.data = null;
        this.envRootPath = envRootLocator.envRootPath;
        this.dotnetRelDirPath = null;
        this.contentRelDirPath = null;
        this.nodejsRelDirPath = null;
        this.pythonRelDirPath = null;
        this.powershellRelDirPath = null;
        this.dotnetLgcRelDirPath = null;
    }

    getEnvRootRelPath(pathArray) {
        let relPath = envRootLocator.getEnvRootRelPath(pathArray);
        return relPath;
    }
}

module.exports.EnvRootConfig = EnvRootConfig;

let envRootConfigInstance = new EnvRootConfig();
envRootConfigInstance.data = Object.freeze(loadJsonInto(filePath, envRootConfigInstance));

const envRootConfig = Object.freeze(envRootConfigInstance);
module.exports.envRootConfig = envRootConfig;

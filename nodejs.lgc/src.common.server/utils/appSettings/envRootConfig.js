import { loadJsonInto } from '../fileSystem/json.js';
import { envRootLocator } from './envRootLocator.js';

const filePath = envRootLocator.getEnvRootRelPath(["env-root.jsconfig.json"]);

export class EnvRootConfig {
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

let envRootConfigInstance = new EnvRootConfig();
envRootConfigInstance.data = Object.freeze(loadJsonInto(filePath, envRootConfigInstance));

export const envRootConfig = Object.freeze(envRootConfigInstance);


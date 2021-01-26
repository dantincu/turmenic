import path from 'path';
import { loadJsonInto } from '../fileSystem/json.js';
import { appEnvLocator } from './appEnvLocator.js';
import { envRootLocator } from './envRootLocator.js';

export const envBaseDir = {
    config: "config",
    data: "data",
    logs: "logs",
    metadata: "metadata",
    temp: "temp"
};

export class EnvConfig {
    constructor() {
        this.data = null;
        this.envBasePath = null;
        this.configRelDirPath = null;
        this.dataRelDirPath = null;
        this.logsRelDirPath = null;
        this.metadataRelDirPath = null;
        this.tempRelDirPath = null;
    }

    getEnvDirPath(envBaseDirName) {
        let envBaseRelDirPath = this[envBaseDirName + "RelDirPath"] || envBaseDirName || "";
        let envDirPath = path.join(this.envBasePath, envBaseRelDirPath);

        return envDirPath;
    }

    getEnvRelPath(envBaseDirName, relPathPartsArr) {
        let envDirPath = this.getEnvDirPath(envBaseDirName);
        let relPath = path.join.apply(path, [envDirPath, ...relPathPartsArr]);

        return relPath;
    }
}

const envConfigData = {
    appEnv: null,
    namedEnv: {
    }
};

export const envConfig = {
    get appEnv() {
        return envConfigData.appEnv;
    },
    namedEnv(name) {
        return envConfigData.namedEnv[name];
    }
};

const assureNamedNotLoaded = name => {
    if (envConfig.namedEnv[name]) {
        throw new Error("Env config with name " + name + " has already been loaded!");
    }
};

const assureDefaultNotLoaded = () => {
    if (envConfig.appEnv) {
        throw new Error("Default env config has already been loaded!");
    }
};

export const load = relDirPathPartsArr => {
    let envConfig = new EnvConfig();
    envConfig.envBasePath = envRootLocator.getEnvRootRelPath(relDirPathPartsArr);

    let filePath = path.join(envConfig.envBasePath, "env.jsconfig.json");
    envConfig.data = Object.freeze(loadJsonInto(filePath, envConfig));

    Object.freeze(envConfig);
    return envConfig;
};

export const loadNamedEnv = (name, relDirPathPartsArr) => {
    assureNamedNotLoaded(name);
    let envConfig = load(relDirPathPartsArr);
    
    envConfigData.namedEnv[name] = envConfig;
    return envConfig;
};

export const loadAppEnv = relDirPathPartsArr => {
    assureDefaultNotLoaded();
    relDirPathPartsArr = relDirPathPartsArr || [];

    if (relDirPathPartsArr.length == 0) {
        relDirPathPartsArr.push(appEnvLocator.appEnvBaseRelPath);
    }

    let envConfig = load(relDirPathPartsArr);
    envConfigData.appEnv = envConfig;

    return envConfig;
};

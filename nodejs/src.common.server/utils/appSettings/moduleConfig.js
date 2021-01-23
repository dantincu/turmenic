import { envConfig, envBaseDir } from './envConfig.js';
import { loadJsonInto } from '../fileSystem/json.js'

export class ModuleConfig {
    constructor() {
        this.modules = {
        }
    }

    getModCfgFilePath(moduleName, filePathParts) {
        if ((filePathParts || []).length == 0) {
            filePathParts = [ moduleName, "module.jsconfig.json" ];
        }

        let filePath = envConfig.appEnv.getEnvRelPath(envBaseDir.config, filePathParts);
        return filePath;
    }

    get(modName) {
        let mod = this.modules[modName];
        return mod;
    }

    load({
        mn: moduleName,
        obj: instance = null,
        fpp: filePathParts = null,
        transform = ((cfg, data) => {
            let mod = {
                data: data,
                cfg: cfg
            };

            return mod;
        })
    }) {
        let filePath = this.getModCfgFilePath(moduleName, filePathParts);
        console.log("loading database version from config file", filePath);
        instance = instance || new Object();

        let data = loadJsonInto(filePath, instance);
        let mod = transform(instance, data);

        this.modules[moduleName] = mod;
        return mod;
    }

    normalizeOptions(opts) {
        let modName = opts;

        if (typeof(opts) === "string") {
            opts = {
                mn: modName
            }
        }

        return opts;
    }

    getOrLoad(opts) {
        opts = this.normalizeOptions(opts);
        let mod = this.get(opts.mn);

        if (!mod) {
            mod = this.load(opts);
        }

        return mod;
    }
}

export const cfg = new ModuleConfig();
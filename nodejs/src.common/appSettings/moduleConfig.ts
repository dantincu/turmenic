import { envConfig, envBaseDir } from "./envConfig.js";
import { loadJsonAsyncInto } from "../fileSystem/json.js";

export interface ModuleConfigOptions {
  mn: string;
  obj?: object;
  fpp?: string[];
}

export class ModuleConfig {
  modules: {};
  constructor() {
    this.modules = {};
  }

  async getModCfgFilePath(
    moduleName: string,
    ...filePathParts: string[]
  ): Promise<string> {
    if ((filePathParts || []).length == 0) {
      filePathParts = [moduleName, "module.jsconfig.json"];
    }

    let filePath = (await envConfig.appEnv.instance()).getEnvRelPath(
      envBaseDir.config,
      ...filePathParts
    );
    return filePath;
  }

  get(modName): any {
    let mod = this.modules[modName];
    return mod;
  }

  async load(
    opts: ModuleConfigOptions & {
      transform?: (cfg, data) => object;
    }
  ) {
    opts.transform =
      opts.transform ??
      ((cfg, data) => {
        let mod = {
          data: data,
          cfg: cfg,
        };

        return mod;
      });

    let moduleName = opts.mn;
    let instance = opts.obj || new Object();
    let filePathParts = opts.fpp;

    let filePath = await this.getModCfgFilePath(moduleName, ...filePathParts);
    let data = Object.freeze(await loadJsonAsyncInto(filePath, instance));
    let mod = Object.freeze(opts.transform(instance, data));

    this.modules[moduleName] = mod;
    return mod;
  }

  normalizeOptions(opts: ModuleConfigOptions | string): ModuleConfigOptions {
    let modName = opts;

    if (typeof opts === "string") {
      opts = <ModuleConfigOptions>{
        mn: <string>modName,
      };
    }

    return opts;
  }

  async getOrLoad(opts: ModuleConfigOptions | string): Promise<object> {
    opts = this.normalizeOptions(opts);
    let mod: object = this.get(opts.mn);

    if (!mod) {
      mod = await this.load(opts);
    }

    return mod;
  }
}

export const cfg = new ModuleConfig();

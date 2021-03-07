import { envConfig, envBaseDir } from "./envConfig.js";
import { loadJsonAsyncInto } from "../fileSystem/json.js";

export interface ModuleConfigOptions {
  mn: string;
  obj?: object;
  fpp?: string[];
}

export interface ModuleData {
  cfg: ModuleConfigOptions;
  data: any;
}

export class ModuleConfig {
  modules: { [keyof: string]: ModuleData };
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

  get(modName: string): ModuleData {
    let mod = this.modules[modName];
    return mod;
  }

  async load(
    opts: ModuleConfigOptions & {
      transform?: (cfg: ModuleConfigOptions, data: any) => ModuleData;
    }
  ) {
    opts.transform =
      opts.transform ??
      ((cfg, data) => {
        let mod = <ModuleData>{
          data: data,
          cfg: cfg,
        };

        return mod;
      });

    let moduleName = opts.mn;
    let instance = opts.obj ?? {};
    let filePathParts = opts.fpp ?? [];

    let filePath = await this.getModCfgFilePath(moduleName, ...filePathParts);
    let data = Object.freeze(await loadJsonAsyncInto(filePath, instance));
    let mod = Object.freeze(opts.transform(opts, data));

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

  async getOrLoad(opts: ModuleConfigOptions | string): Promise<ModuleData> {
    opts = this.normalizeOptions(opts);
    let mod: ModuleData = this.get(opts.mn);

    if (!mod) {
      mod = await this.load(opts);
    }

    return mod;
  }
}

export const cfg = new ModuleConfig();

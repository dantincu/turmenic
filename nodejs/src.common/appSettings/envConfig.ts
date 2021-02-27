import path from "path";
import { loadJsonInto } from "../fileSystem/json.js";
import { appEnvLocator } from "./appEnvLocator.js";
import { envRootLocator } from "./envRootLocator.js";
import { getWithKey, setWithKey } from "../stronglyTyped/keyIndexing.js";

console.log("importing env config module");

export const envBaseDir = {
  config: "config",
  data: "data",
  logs: "logs",
  metadata: "metadata",
  temp: "temp",
};

export class EnvConfig {
  public data: any | null;
  public envBasePath: string | null;
  public configRelDirPath: string | null;
  public dataRelDirPath: string | null;
  public logsRelDirPath: string | null;
  public metadataRelDirPath: string | null;
  public tempRelDirPath: string | null;

  constructor() {
    this.data = null;
    this.envBasePath = null;
    this.configRelDirPath = null;
    this.dataRelDirPath = null;
    this.logsRelDirPath = null;
    this.metadataRelDirPath = null;
    this.tempRelDirPath = null;
  }

  getEnvDirPath(envBaseDirName: string): string {
    getWithKey(this, envBaseDirName + "RelDirPath");

    let envBaseRelDirPath: string =
      getWithKey(this, envBaseDirName + "RelDirPath") || envBaseDirName || "";
    let envDirPath = path.join(this.envBasePath ?? "", envBaseRelDirPath);

    return envDirPath;
  }

  getEnvRelPath(envBaseDirName: string, ...relPathPartsArr: string[]): string {
    let envDirPath = this.getEnvDirPath(envBaseDirName);
    let relPath = path.join(envDirPath, ...relPathPartsArr);

    return relPath;
  }
}

const envConfigData = {
  appEnv: <EnvConfig | null>null,
  namedEnv: <{ string: EnvConfig }>{},
};

export const envConfig = {
  get appEnv(): EnvConfig | null {
    return envConfigData.appEnv;
  },
  namedEnv(name: string): EnvConfig | null {
    return getWithKey(envConfigData.namedEnv, name);
  },
};

const assureNamedNotLoaded = (name: string): void => {
  if (getWithKey(envConfigData.namedEnv, name)) {
    throw new Error(
      "Env config with name " + name + " has already been loaded!"
    );
  }
};

const assureDefaultNotLoaded = (): void => {
  if (envConfig.appEnv) {
    throw new Error("Default env config has already been loaded!");
  }
};

export const load = (...relDirPathPartsArr: string[]): EnvConfig => {
  let envConfig = new EnvConfig();
  envConfig.envBasePath = envRootLocator.getEnvRootRelPath(
    ...relDirPathPartsArr
  );

  let filePath = path.join(envConfig.envBasePath, "env.jsconfig.json");
  envConfig.data = Object.freeze(loadJsonInto(filePath, envConfig));

  Object.freeze(envConfig);
  return envConfig;
};

export const loadNamedEnv = (
  name: string,
  ...relDirPathPartsArr: string[]
): EnvConfig => {
  assureNamedNotLoaded(name);
  let envConfig = load(...relDirPathPartsArr);

  setWithKey(envConfigData.namedEnv, name, envConfig);
  return envConfig;
};

export const loadAppEnv = (...relDirPathPartsArr: string[]): EnvConfig => {
  assureDefaultNotLoaded();

  if (relDirPathPartsArr.length == 0) {
    relDirPathPartsArr.push(appEnvLocator.appEnvBaseRelPath ?? "");
  }

  let envConfig = load(...relDirPathPartsArr);
  envConfigData.appEnv = envConfig;

  return envConfig;
};

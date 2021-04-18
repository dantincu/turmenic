import path from "path";
import { AsyncSingleton } from "../../src.common/async/async-singleton.js";
import { loadJsonAsyncInto } from "../fileSystem/json.js";
import { appEnvLocator } from "./appEnvLocator.js";
import { envRootLocator } from "./envRootLocator.js";
import {
  getWithKey,
  setWithKey,
} from "../../src.common/stronglyTyped/keyIndexing.js";

import { appConsole } from "../../src.common/logging/appConsole.js";

appConsole.log("importing env config module");

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
  appEnv: <AsyncSingleton<EnvConfig> | null>null,
};

export const envConfig = {
  get appEnv(): AsyncSingleton<EnvConfig> {
    envConfigData.appEnv = envConfigData.appEnv || getAppEnvSingleton();
    return <AsyncSingleton<EnvConfig>>envConfigData.appEnv;
  },
};

export const getAppEnvSingleton = (
  ...relDirPathPartsArr: string[]
): AsyncSingleton<EnvConfig> => {
  let envConfigSingleton = new AsyncSingleton<EnvConfig>(async () => {
    let envConfig = new EnvConfig();

    if (relDirPathPartsArr.length == 0) {
      relDirPathPartsArr.push(
        (await appEnvLocator.instance()).appEnvBaseRelPath || ""
      );
    }

    envConfig.envBasePath = (await envRootLocator.instance()).getEnvRootRelPath(
      ...relDirPathPartsArr
    );

    let filePath = path.join(envConfig.envBasePath, "env.jsconfig.json");
    envConfig.data = Object.freeze(
      await loadJsonAsyncInto(filePath, envConfig)
    );

    envConfig = Object.freeze(envConfig);
    return envConfig;
  });

  return envConfigSingleton;
};

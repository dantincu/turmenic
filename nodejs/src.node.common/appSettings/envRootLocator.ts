import path from "path";
import * as fsPath from "../fileSystem/platform.js";
import { loadJsonAsyncInto } from "../fileSystem/json.js";
import { appDataEnv } from "../appDataEnv.js";
import { AsyncSingleton } from "../../src.common/async/async-singleton.js";

class EnvRootLocatorData {
  public envRootPath: string | null;
  public useMachineDefaultAppDataDir: boolean | null;
  public machineAppDataEnvDirRelPath: string | null;

  constructor() {
    this.envRootPath = null;
    this.useMachineDefaultAppDataDir = null;
    this.machineAppDataEnvDirRelPath = null;
  }

  getEnvRootPath(): string {
    let envRootPath = fsPath.absPathToPlatformStyle(this.envRootPath ?? "");

    if (this.useMachineDefaultAppDataDir) {
      envRootPath = appDataEnv.getAppDataRelDirPath([
        this.machineAppDataEnvDirRelPath ?? "",
      ]);
    }

    return envRootPath;
  }
}

export class EnvRootLocator {
  public data: EnvRootLocatorData | null;
  public envRootPath: string | null;

  constructor() {
    this.data = null;
    this.envRootPath = null;
  }

  getEnvRootRelPath(...pathArray: string[]): string {
    let relPath = path.join(this.envRootPath ?? "", ...pathArray);
    return relPath;
  }
}

export const envRootLocator = new AsyncSingleton<EnvRootLocator>(async () => {
  let envRootLocatorData = new EnvRootLocatorData();

  let filePath = "./src/appSettings/env-root-locator.jsconfig.json";
  await loadJsonAsyncInto(filePath, envRootLocatorData);
  envRootLocatorData = Object.freeze(envRootLocatorData);

  let envRootLocatorInstance = new EnvRootLocator();
  envRootLocatorInstance.data = envRootLocatorData;
  envRootLocatorInstance.envRootPath = envRootLocatorData.getEnvRootPath();

  return Object.freeze(envRootLocatorInstance);
});

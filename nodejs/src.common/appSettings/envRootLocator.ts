import path from "path";
import * as fsPath from "../fileSystem/path.js";
import { loadJsonInto } from "../fileSystem/json.js";
import { appDataEnv } from "../appDataEnv.js";
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

let envRootLocatorData = new EnvRootLocatorData();

let filePath = "./src/appSettings/env-root-locator.jsconfig.json";
loadJsonInto(filePath, envRootLocatorData);
envRootLocatorData = Object.freeze(envRootLocatorData);

let envRootLocatorInstance = new EnvRootLocator();
envRootLocatorInstance.data = envRootLocatorData;
envRootLocatorInstance.envRootPath = envRootLocatorData.getEnvRootPath();

export const envRootLocator = Object.freeze(envRootLocatorInstance);

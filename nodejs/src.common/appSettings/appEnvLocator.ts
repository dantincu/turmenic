import path from "path";
import { loadJsonInto } from "../fileSystem/json.js";
import { envRootConfig } from "./envRootConfig.js";

class AppEnvLocatorData {
  public appEnvBaseRelPath: string | null;
  public useDefaultEnvRootDir: boolean | null;

  constructor() {
    this.appEnvBaseRelPath = null;
    this.useDefaultEnvRootDir = null;
  }

  getAppEnvBaseRelPath() {
    let appEnvRelBasePath = this.appEnvBaseRelPath;

    if (this.useDefaultEnvRootDir) {
      appEnvRelBasePath = path.join(
        envRootConfig.nodejsRelDirPath ?? "",
        this.appEnvBaseRelPath || ""
      );
    }

    return appEnvRelBasePath;
  }

  getAppEnvBasePath() {
    let appEnvBaseRelPath = this.getAppEnvBaseRelPath();
    let appEnvBasePath = path.join(
      envRootConfig.envRootPath ?? "",
      appEnvBaseRelPath || ""
    );

    return appEnvBasePath;
  }
}

export class AppEnvLocator {
  public data: AppEnvLocatorData | null;
  public appEnvBasePath: string | null;
  public appEnvBaseRelPath: string | null;

  constructor() {
    this.data = null;
    this.appEnvBasePath = null;
    this.appEnvBaseRelPath = null;
  }
}

let appEnvLocatorData = new AppEnvLocatorData();

let filePath = "./src/appSettings/app-env-locator.jsconfig.json";
loadJsonInto(filePath, appEnvLocatorData);
appEnvLocatorData = Object.freeze(appEnvLocatorData);

let appEnvLocatorInstance = new AppEnvLocator();
appEnvLocatorInstance.data = appEnvLocatorData;
appEnvLocatorInstance.appEnvBasePath = appEnvLocatorData.getAppEnvBasePath();
appEnvLocatorInstance.appEnvBaseRelPath = appEnvLocatorData.getAppEnvBaseRelPath();

export const appEnvLocator = Object.freeze(appEnvLocatorInstance);

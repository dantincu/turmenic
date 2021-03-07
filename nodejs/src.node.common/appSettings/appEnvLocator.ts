import path from "path";
import { loadJsonAsyncInto } from "../fileSystem/json.js";
import { envRootConfig, EnvRootConfig } from "./envRootConfig.js";
import { AsyncSingleton } from "../async/async-singleton.js";

class AppEnvLocatorData {
  public appEnvBaseRelPath: string | null;
  public useDefaultEnvRootDir: boolean | null;
  public envRootConfig: EnvRootConfig;

  constructor(envRootConfig: EnvRootConfig) {
    this.envRootConfig = envRootConfig;
    this.appEnvBaseRelPath = null;
    this.useDefaultEnvRootDir = null;
  }

  getAppEnvBaseRelPath() {
    let appEnvRelBasePath = this.appEnvBaseRelPath;

    if (this.useDefaultEnvRootDir) {
      appEnvRelBasePath = path.join(
        this.envRootConfig.nodejsRelDirPath ?? "",
        this.appEnvBaseRelPath || ""
      );
    }

    return appEnvRelBasePath;
  }

  getAppEnvBasePath() {
    let appEnvBaseRelPath = this.getAppEnvBaseRelPath();
    let appEnvBasePath = path.join(
      this.envRootConfig.envRootPath ?? "",
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

export const appEnvLocator = new AsyncSingleton(async () => {
  const envRootConfigInstance = await envRootConfig.instance();
  let appEnvLocatorData = new AppEnvLocatorData(envRootConfigInstance);

  let filePath = "./src/appSettings/app-env-locator.jsconfig.json";
  await loadJsonAsyncInto(filePath, appEnvLocatorData);
  appEnvLocatorData = Object.freeze(appEnvLocatorData);

  let appEnvLocatorInstance = new AppEnvLocator();
  appEnvLocatorInstance.data = appEnvLocatorData;
  appEnvLocatorInstance.appEnvBasePath = appEnvLocatorData.getAppEnvBasePath();
  appEnvLocatorInstance.appEnvBaseRelPath = appEnvLocatorData.getAppEnvBaseRelPath();

  return Object.freeze(appEnvLocatorInstance);
});

import { loadJsonAsyncInto } from "../fileSystem/json.js";
import { envRootLocator, EnvRootLocator } from "./envRootLocator.js";
import { AsyncSingleton } from "../async/async-singleton.js";

export class EnvRootConfig {
  public data: any | null;
  public envRootPath: string | null;
  public dotnetRelDirPath: string | null;
  public contentRelDirPath: string | null;
  public nodejsRelDirPath: string | null;
  public pythonRelDirPath: string | null;
  public powershellRelDirPath: string | null;
  public dotnetLgcRelDirPath: string | null;
  public envRootLocator: EnvRootLocator;

  constructor(envRootLocator: EnvRootLocator) {
    this.envRootLocator = envRootLocator;
    this.data = null;
    this.envRootPath = this.envRootLocator.envRootPath;
    this.dotnetRelDirPath = null;
    this.contentRelDirPath = null;
    this.nodejsRelDirPath = null;
    this.pythonRelDirPath = null;
    this.powershellRelDirPath = null;
    this.dotnetLgcRelDirPath = null;
  }

  getEnvRootRelPath(...pathArray: string[]): string {
    let relPath = this.envRootLocator.getEnvRootRelPath(...pathArray);
    return relPath;
  }
}

// export const envRootConfig = Object.freeze(envRootConfigInstance);
export const envRootConfig = new AsyncSingleton<EnvRootConfig>(async () => {
  const envRootLocatorInstance = await envRootLocator.instance();
  const filePath = envRootLocatorInstance.getEnvRootRelPath(
    "env-root.jsconfig.json"
  );

  let envRootConfigInstance = new EnvRootConfig(envRootLocatorInstance);
  envRootConfigInstance.data = Object.freeze(
    await loadJsonAsyncInto(filePath, envRootConfigInstance)
  );

  return Object.freeze(envRootConfigInstance);
});

import { loadJsonInto } from "../fileSystem/json.js";
import { envRootLocator } from "./envRootLocator.js";

const filePath = envRootLocator.getEnvRootRelPath(["env-root.jsconfig.json"]);

export class EnvRootConfig {
  public data: any | null;
  public envRootPath: string | null;
  public dotnetRelDirPath: string | null;
  public contentRelDirPath: string | null;
  public nodejsRelDirPath: string | null;
  public pythonRelDirPath: string | null;
  public powershellRelDirPath: string | null;
  public dotnetLgcRelDirPath: string | null;

  constructor() {
    this.data = null;
    this.envRootPath = envRootLocator.envRootPath;
    this.dotnetRelDirPath = null;
    this.contentRelDirPath = null;
    this.nodejsRelDirPath = null;
    this.pythonRelDirPath = null;
    this.powershellRelDirPath = null;
    this.dotnetLgcRelDirPath = null;
  }

  getEnvRootRelPath(pathArray: string[]): string {
    let relPath = envRootLocator.getEnvRootRelPath(pathArray);
    return relPath;
  }
}

let envRootConfigInstance = new EnvRootConfig();
envRootConfigInstance.data = Object.freeze(
  loadJsonInto(filePath, envRootConfigInstance)
);

export const envRootConfig = Object.freeze(envRootConfigInstance);

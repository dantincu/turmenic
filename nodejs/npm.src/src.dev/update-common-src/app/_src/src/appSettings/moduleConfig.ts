import {
  ModuleConfig,
  ModuleConfigOptions,
  cfg,
} from "../../src.node.common/appSettings/moduleConfig.js";

export interface TurmerikCommonSrcFolder {
  isNodeJs: boolean;
  isServer: boolean;
  isClient: boolean;
}

export interface TurmerikSrcNodeJsApp {
  appSrcDirName: string;
  srcDirName?: string | null | undefined;
}

export interface TurmerikSrcAppsFolder {
  appsSrcFolderName: string;
  apps: TurmerikSrcNodeJsApp[];
}

export interface TurmerikSrcAppsMainFolder {
  isServer: boolean;
  isClient: boolean;
  appsSrcMainFolderName: string;
  appFolders: TurmerikSrcAppsFolder[];
}

export interface UpdateTurmerikCommonSrcCfg {
  turmerikRepoDirPath: string;
  nodejsAppsRelDirPath: string;
  npmSrcRelDirPath: string;
  defaultAppSrcDirName: string;
  mainSrcFolders: TurmerikSrcAppsMainFolder[];
}

export const hapiServerOptionsCfg = <UpdateTurmerikCommonSrcCfg>(
  await cfg.getOrLoad({
    mn: "updateTurmerikCommonSrc",
  })
).data;

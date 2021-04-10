import path from "path";
import { nameof } from "ts-simple-nameof";

import {
  ModuleConfig,
  ModuleConfigOptions,
  cfg,
} from "../../../src.node.common/appSettings/moduleConfig.js";

export interface TurmerikRepoInfo {
  repoDirPath: string;
}

export const turmerikRepoInfo = <TurmerikRepoInfo>(
  await cfg.getOrLoad({
    mn: "turmerikRepoInfo",
  })
).data;

export interface DirName {
  dirName: string;
}

export interface BasePath {
  basePath: string;
}

export interface FolderInfo {
  dirName: string;
  basePath: string;
}

export interface AppSrcDirInfo extends FolderInfo {
  src: FolderInfo;
}

export interface AppInfo extends FolderInfo {
  srcDir: AppSrcDirInfo;
}

export interface DriveExplorerInfo extends FolderInfo {
  reactApp: AppInfo;
}

export interface ClientSrcPathsInfo extends FolderInfo {
  driveExplorer: DriveExplorerInfo;
}

export interface ClientTestInfo extends FolderInfo {
  reactApp: AppInfo;
}

export interface ClientTestSrcPathsInfo extends FolderInfo {
  test: ClientTestInfo;
}

export interface NpmFoldersSrcPathsInfo extends FolderInfo {
  client: ClientSrcPathsInfo;
  clientTest: ClientTestSrcPathsInfo;
}

export interface CommonFolders {
  common: DirName;
  nodeCommon: DirName;
  nodeCommonClient: DirName;
  nodeCommonServer: DirName;
}

export interface NodeJsSrcPathsInfo extends FolderInfo {
  npmFolders: NpmFoldersSrcPathsInfo;
  commonFolders: CommonFolders;
}

export interface TurmerikRepoSrcPaths extends BasePath {
  nodeJs: NodeJsSrcPathsInfo;
}

export const turmerikRepoSrcPaths = Object.freeze(
  (() => {
    const getAppObj = (appDirName: string, appDirBasePath: string): AppInfo => {
      const appObj = {
        basePath: path.join(appDirBasePath, appDirName),
        dirName: appDirName,
      } as AppInfo;

      appObj.srcDir = {} as AppSrcDirInfo;
      appObj.srcDir.dirName = "_src";
      appObj.srcDir.basePath = path.join(
        appObj.basePath,
        appObj.srcDir.dirName
      );

      appObj.srcDir.src = {} as FolderInfo;
      appObj.srcDir.src.dirName = "src";
      appObj.srcDir.src.basePath = path.join(
        appObj.srcDir.basePath,
        appObj.srcDir.src.dirName
      );

      return appObj;
    };

    const obj = {
      basePath: turmerikRepoInfo.repoDirPath,
      nodeJs: {
        dirName: "nodejs",
      },
    } as TurmerikRepoSrcPaths;

    obj.nodeJs = {} as NodeJsSrcPathsInfo;
    obj.nodeJs.dirName = "nodejs";
    obj.nodeJs.basePath = path.join(obj.basePath, obj.nodeJs.dirName);

    obj.nodeJs.npmFolders = {} as NpmFoldersSrcPathsInfo;
    obj.nodeJs.npmFolders.dirName = "npm.src";
    obj.nodeJs.npmFolders.basePath = path.join(
      obj.nodeJs.basePath,
      obj.nodeJs.npmFolders.dirName
    );

    obj.nodeJs.npmFolders.client = {} as ClientSrcPathsInfo;
    obj.nodeJs.npmFolders.client.dirName = "src.client";
    obj.nodeJs.npmFolders.client.basePath = path.join(
      obj.nodeJs.npmFolders.basePath,
      obj.nodeJs.npmFolders.client.dirName
    );

    obj.nodeJs.npmFolders.client.driveExplorer = {} as DriveExplorerInfo;
    obj.nodeJs.npmFolders.client.driveExplorer.dirName = "drive-explorer";
    obj.nodeJs.npmFolders.client.driveExplorer.basePath = path.join(
      obj.nodeJs.npmFolders.client.basePath,
      obj.nodeJs.npmFolders.client.driveExplorer.dirName
    );

    obj.nodeJs.npmFolders.client.driveExplorer.reactApp = getAppObj(
      "react-app",
      obj.nodeJs.npmFolders.client.driveExplorer.basePath
    );

    obj.nodeJs.npmFolders.clientTest = {} as ClientTestSrcPathsInfo;
    obj.nodeJs.npmFolders.clientTest.dirName = "test.node.common.client";
    obj.nodeJs.npmFolders.clientTest.basePath = path.join(
      obj.nodeJs.npmFolders.basePath,
      obj.nodeJs.npmFolders.clientTest.dirName
    );

    obj.nodeJs.npmFolders.clientTest.test = {} as ClientTestInfo;
    obj.nodeJs.npmFolders.clientTest.test.dirName = "test";
    obj.nodeJs.npmFolders.clientTest.test.basePath = path.join(
      obj.nodeJs.npmFolders.clientTest.basePath,
      obj.nodeJs.npmFolders.clientTest.test.dirName
    );

    obj.nodeJs.npmFolders.clientTest.test.reactApp = getAppObj(
      "react-app",
      obj.nodeJs.npmFolders.clientTest.test.basePath
    );

    obj.nodeJs.commonFolders = (() => {
      const getDirObj = (dirParts: string[]): DirName => {
        const obj: DirName = {
          dirName: [src].concat(dirParts).join("."),
        };

        return obj;
      };

      const src = "src";

      const common = "common";
      const node = "node";
      const client = "client";
      const server = "server";

      const cfObj = {} as CommonFolders;
      cfObj.common = getDirObj([common]);
      cfObj.nodeCommon = getDirObj([node, common]);

      cfObj.nodeCommonClient = getDirObj([node, common, client]);
      cfObj.nodeCommonServer = getDirObj([node, common, server]);

      return cfObj;
    })();

    return obj;
  })() as TurmerikRepoSrcPaths
);

export const turmerikRepoPaths = Object.freeze({
  basePath: turmerikRepoSrcPaths.nodeJs.basePath,
  commonclientFolderNames: [
    turmerikRepoSrcPaths.nodeJs.commonFolders.common.dirName,
    turmerikRepoSrcPaths.nodeJs.commonFolders.nodeCommon.dirName,
    turmerikRepoSrcPaths.nodeJs.commonFolders.nodeCommonClient.dirName,
  ],
  clientTestAppSrcPath:
    turmerikRepoSrcPaths.nodeJs.npmFolders.clientTest.test.reactApp.srcDir.src
      .basePath,
});

export const driveExplorerPaths = Object.freeze({
  clientAppSrcPath:
    turmerikRepoSrcPaths.nodeJs.npmFolders.client.driveExplorer.reactApp.srcDir
      .src.basePath,
});

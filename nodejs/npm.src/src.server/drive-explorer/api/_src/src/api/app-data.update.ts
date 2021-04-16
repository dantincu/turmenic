import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";
import { AppLocalFileUpdateManager } from "../data/json/local-file-app-data/update/manager.js";
import { DeviceAppDrivesUpdateManager } from "../data/json/local-file-app-data/device-app-drives/update/manager.js";

const appEnv = await envConfig.appEnv.instance();
import {
  appLocalFileDataSource,
  deviceAppDrivesDataSource,
} from "./device-app-drives/app-data.js";

import { appLocalFileDataSourceInfo } from "../data/json/local-file-app-data/local-file-app-data.js";

export const assureUpToDate = async () => {
  for (let i = 0; i < updateManagers.length; i++) {
    const updateMngr = updateManagers[i];
    await updateMngr.assureUpToDate();
  }
};

const updateManagers = [
  new AppLocalFileUpdateManager({
    envConfig: appEnv,
    dataSource: appLocalFileDataSource,
    metadataCollection: appLocalFileDataSource.metadataCollection,
    requiredVersion: appLocalFileDataSourceInfo.requiredVersion,
  }),
  new DeviceAppDrivesUpdateManager({
    envConfig: appEnv,
    dataSource: deviceAppDrivesDataSource,
    metadataCollection: deviceAppDrivesDataSource.metadataCollection,
    requiredVersion: appLocalFileDataSourceInfo.requiredVersion,
  }),
];

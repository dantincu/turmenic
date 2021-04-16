import { envConfig } from "../../../src.node.common/appSettings/envConfig.js";
import { AppLocalFileDataSource } from "../../data/json/local-file-app-data/data-source.js";
import { DeviceAppDrivesDataSource } from "../../data/json/local-file-app-data/device-app-drives/data-source.js";

import {
  AppDrive,
  DeviceAppDriveSessions,
  FolderNode,
} from "../../../src.node.common/app-data/device-app-drives/types.js";

import { uStrId } from "../../../src.node.common/data/uStrId.js";
import { AddAppDrive } from "../../../src.node.common/app-data/device-app-drives/request.types.js";

import {
  DeviceRootDirLocation,
  DeviceDirLocationType,
} from "../../../src.node.common/app-data/schema/device-dir-locations.schema.js";
import { deviceDirLocationTypeKeys } from "../../data/app-data/deviceDirLocationTypes.js";

import { appConsole } from "../../../src.common/logging/appConsole.js";

const appEnv = await envConfig.appEnv.instance();
export const appLocalFileDataSource = new AppLocalFileDataSource(appEnv);
export const deviceAppDrivesDataSource = new DeviceAppDrivesDataSource(appEnv);

export class DeviceAppDrivesData {
  deviceAppDriveSessions: DeviceAppDriveSessions;

  constructor() {
    this.deviceAppDriveSessions = {
      allAppDrives: [],
      appSessions: [],
    };
  }

  public async loadData() {
    await deviceAppDrivesDataSource.load();

    this.deviceAppDriveSessions.allAppDrives =
      deviceAppDrivesDataSource.allAppDrivesCollection.currentData ?? [];

    this.deviceAppDriveSessions.appSessions =
      deviceAppDrivesDataSource.appSessionsCollection.currentData ?? [];
  }

  public async saveData() {
    const saveResult = await deviceAppDrivesDataSource.save(true);
    return saveResult.success;
  }

  public async addDeviceAppDrive(addAppDrive: AddAppDrive) {
    const deviceRootDirLocationUuid = uStrId();
    const appDriveUuid = uStrId();
    const folderUuid = uStrId();

    let deviceRootDirLocation = {
      uuid: deviceRootDirLocationUuid,
      name: addAppDrive.label,
      absPath: addAppDrive.path,
      description: addAppDrive.description,
      isDefault:
        (
          appLocalFileDataSource.deviceRootDirLocationCollection.currentData ??
          []
        ).length === 0,
      locationTypeKey: deviceDirLocationTypeKeys.osFsDir,
    } as DeviceRootDirLocation;

    const folderNode: FolderNode = {
      uuid: folderUuid,
      name: addAppDrive.name,
    };

    let appDrive: AppDrive = {
      uuid: appDriveUuid,
      deviceRootDirLocationUuid: deviceRootDirLocationUuid,
      label: addAppDrive.label,
      description: addAppDrive.description,
      rootFolder: {
        uuid: folderUuid,
        name: addAppDrive.name,
        isRoot: true,
        node: folderNode,
        path: addAppDrive.path,
      },
      rootFolderNode: folderNode,
      sortIdx:
        deviceAppDrivesData.deviceAppDriveSessions.allAppDrives
          .map((d) => d.sortIdx)
          .reduce((prev, crnt) => Math.max(prev, crnt), 0) + 1,
    };

    const dataSaveResult = await deviceAppDrivesDataSource.allAppDrivesCollection.insert(
      [appDrive]
    );

    await appLocalFileDataSource.deviceRootDirLocationCollection.insert([
      deviceRootDirLocation,
    ]);

    return dataSaveResult?.inserted.pop() as AppDrive;
  }
}

await appLocalFileDataSource.deviceRootDirLocationCollection.load();

export const deviceAppDrivesData = new DeviceAppDrivesData();
await deviceAppDrivesData.loadData();

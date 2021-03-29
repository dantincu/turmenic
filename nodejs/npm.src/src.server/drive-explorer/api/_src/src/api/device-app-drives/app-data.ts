import { envConfig } from "../../../src.node.common/appSettings/envConfig.js";
import { AppLocalFileDataSource } from "../../data/json/local-file-app-data/data-source.js";
import { DeviceAppDrivesDataSource } from "../../data/json/local-file-app-data/device-app-drives/data-source.js";

import {
  AppDrive,
  DeviceAppDriveSessions,
  FolderNode,
} from "../../../src.node.common/app-data/device-app-drives/types.js";

import { uStrId } from "../../../src.node.common/data/uStrId.js";
import { AddAppDrive } from "./request.types.js";

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

  public async loadData(refresh: boolean) {
    await deviceAppDrivesDataSource.get(refresh);

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
    const folderUuid = uStrId();

    const folderNode: FolderNode = {
      uuid: uStrId(),
      name: addAppDrive.name,
    };

    let appDrive: AppDrive = {
      uuid: uStrId(),
      label: addAppDrive.label,
      rootFolder: {
        uuid: folderUuid,
        name: addAppDrive.name,
        isRoot: true,
        node: folderNode,
      },
      rootFolderNode: folderNode,
    };

    const dataSaveResult = await deviceAppDrivesDataSource.allAppDrivesCollection.insert(
      [appDrive]
    );

    return dataSaveResult?.inserted.pop() as AppDrive;
  }
}

export const deviceAppDrivesData = new DeviceAppDrivesData();
await deviceAppDrivesData.loadData(true);

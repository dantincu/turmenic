import {
  AppDrive,
  DriveFile,
  DriveFolder,
  DriveItem,
  FolderNode,
  AppSession,
  FileNode,
  DeviceAppDriveSessions,
} from "../../../src.node.common/app-data/device-app-drives/types.js";

import { handleRoute } from "../api.base.js";
import { DeviceAppRootFolders } from "../../fileSystem/deviceRootFolders.js";
import { FileSystem } from "../../fileSystem/fileSystem.js";

import { deviceAppDrivesData } from "./app-data.js";
import { deviceAppDrive } from "./app-data.validation.js";

import {
  stringToBoolean,
  reqStrValIsValid,
} from "../../../src.common/validation/text.js";

import { AddAppDrive } from "./request.types.js";

const deviceAppRootFolders = new DeviceAppRootFolders();
const fileSystem = new FileSystem(deviceAppRootFolders);

export const getDeviceRootFolders = async (refresh: string) => {
  const result = await handleRoute(async () => {
    const rootFolders = stringToBoolean(refresh)
      ? await fileSystem.refreshFileSystemRootFolders()
      : await fileSystem.getFileSystemRootFolders();
    return rootFolders;
  });

  return result;
};

export const getDeviceAppDrives = async () => {
  const result = await handleRoute(async () => {
    const deviceAppDrives = await deviceAppDrivesData.deviceAppDriveSessions
      .allAppDrives;

    return deviceAppDrives;
  });

  return result;
};

export const addDeviceAppDrive = async (payload: string) => {
  const result = await handleRoute(async () => {
    const newAppDrive: AddAppDrive = JSON.parse(payload);
    deviceAppDrive.validateAndNormalize(newAppDrive);

    const addedAppDrive = await deviceAppDrivesData.addDeviceAppDrive(
      newAppDrive
    );

    return addedAppDrive;
  });

  return result;
};

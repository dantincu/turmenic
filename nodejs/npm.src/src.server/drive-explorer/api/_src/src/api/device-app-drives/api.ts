import { Boom } from "@hapi/boom";
import { RequestQuery } from "@hapi/hapi";

import { appConsole } from "../../../src.common/logging/appConsole.js";
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

import { handleRoute } from "../../../src.node.common.server/api/hapi/routes.js";
import { DeviceAppRootFolders } from "../../fileSystem/deviceRootFolders.js";
import { FileSystem } from "../../fileSystem/fileSystem.js";

import { deviceAppDrivesData } from "./app-data.js";
import {
  addDeviceAppDriveValidation,
  loadDataValidation,
} from "./app-data.validation.js";

import {
  stringToBoolean,
  reqStrValIsValid,
} from "../../../src.common/validation/text.js";

import {
  AddAppDrive,
  LoadData,
} from "../../../src.node.common/app-data/device-app-drives/request.types.js";

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

export const getDeviceAppDrives = async (query: RequestQuery) => {
  const result = await handleRoute(async () => {
    const loadData = loadDataValidation.getData(query);

    if (loadData.refresh) {
      await deviceAppDrivesData.loadData();
    }

    const deviceAppDrives =
      deviceAppDrivesData.deviceAppDriveSessions.allAppDrives;

    return deviceAppDrives;
  });

  return result;
};

export const addDeviceAppDrive = async (payload: any) => {
  const result = await handleRoute(async () => {
    const newAppDrive = await addDeviceAppDriveValidation.validateAndNormalize(
      payload as AddAppDrive,
      deviceAppDrivesData.deviceAppDriveSessions.allAppDrives
    );

    let addedAppDrive: AppDrive | Boom | null = null;

    if ((newAppDrive as Boom).isBoom === true) {
      addedAppDrive = newAppDrive as Boom;
    } else {
      addedAppDrive = await deviceAppDrivesData.addDeviceAppDrive(
        newAppDrive as AddAppDrive
      );
    }

    return addedAppDrive;
  });

  return result;
};

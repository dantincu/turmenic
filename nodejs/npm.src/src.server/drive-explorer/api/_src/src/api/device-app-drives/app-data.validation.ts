import Boom from "@hapi/boom";
import { RequestQuery } from "@hapi/hapi";

import path from "path";
import isValidPath from "is-valid-path";

import { normalizePath } from "../../../src.node.common/fileSystem/path.js";
import { envConfig } from "../../../src.node.common/appSettings/envConfig.js";
import { intIdGenerator } from "../../../src.common/data/intIdGenerator.js";
import { AppLocalFileDataSource } from "../../data/json/local-file-app-data/data-source.js";
import { DeviceAppDrivesDataSource } from "../../data/json/local-file-app-data/device-app-drives/data-source.js";

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

import { DeviceRootDirLocation } from "../../../src.node.common/app-data/schema/device-dir-locations.schema.js";
import { DeviceAppRootFolders } from "../../fileSystem/deviceRootFolders.js";

import {
  appLocalFileDataSource,
  deviceAppDrivesDataSource,
  DeviceAppDrivesData,
} from "./app-data.js";

import {
  stringToBoolean,
  reqStrValIsValid,
} from "../../../src.common/validation/text.js";

import { readDirIfExists } from "../../../src.node.common/fileSystem/types.async.js";

import {
  AddAppDrive,
  LoadData,
} from "../../../src.node.common/app-data/device-app-drives/request.types.js";

export const addDeviceAppDriveValidation = {
  validateAndNormalize: async (
    newAppDrive: AddAppDrive,
    allAppDrives: AppDrive[]
  ) => {
    let result: AddAppDrive | Boom.Boom | null = null;

    if (reqStrValIsValid(newAppDrive.label) !== true) {
      result = Boom.badRequest("App Drive label required");
    } else if (reqStrValIsValid(newAppDrive.path) !== true) {
      result = Boom.badRequest("App Drive path required");
    } else if (isValidPath(newAppDrive.path) !== true) {
      result = Boom.badRequest("App Drive path is invalid");
    } else if ((await readDirIfExists(newAppDrive.path)) === null) {
      result = Boom.badRequest("App Drive path does not point to a directory");
    } else {
      newAppDrive.name = newAppDrive.path
        .split(/[\/\\]+/g) // gets path segments
        .filter((s) => !!s) // excludes empty segments (like the trailing one if the provided path ends with path separator)
        .pop() as string; // returns the dir name as the last non empty path segment

      console.log("newAppDrive.path", newAppDrive.path);
      newAppDrive.path = normalizePath(newAppDrive.path);
      console.log("normalized", newAppDrive.path);

      if (
        !!allAppDrives.find(
          (drive) => drive.rootFolder.path === newAppDrive.path
        ) === true
      ) {
        result = Boom.badRequest(
          "You have already added an app drive with this path"
        );
      } else {
        result = newAppDrive;
      }
    }

    return result;
  },
};

export const loadDataValidation = {
  getData: (query: RequestQuery) => {
    const data: LoadData = {
      refresh:
        !!query["refresh"] &&
        query["refresh"].toString().toLocaleLowerCase() === "true",
    };

    return data;
  },
};

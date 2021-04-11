import Boom from "@hapi/boom";

import path from "path";
import isValidPath from "is-valid-path";

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

import { isDirEntry } from "../../../src.node.common/fileSystem/fileSystem.js";

import { AddAppDrive } from "./request.types.js";

export const deviceAppDrive = {
  validateAndNormalize: async (newAppDrive: AddAppDrive) => {
    if (reqStrValIsValid(newAppDrive.label)) {
      throw Boom.badRequest("App Drive name required");
    }

    if (reqStrValIsValid(newAppDrive.path)) {
      throw Boom.badRequest("App Drive path required");
    }

    if (isValidPath(newAppDrive.path) !== true) {
      throw Boom.badRequest("App Drive path is invalid");
    }

    if ((await isDirEntry(newAppDrive.path)) !== true) {
      throw Boom.badRequest("App Drive path does not point to a directory");
    }

    newAppDrive.name = newAppDrive.name
      .split(/[\/\\]+/g) // gets path segments
      .filter((s) => !!s) // excludes empty segments (like the trailing one if the provided path ends with path separator)
      .pop() as string; // returns the dir name as the last non empty path segment

    return newAppDrive;
  },
};

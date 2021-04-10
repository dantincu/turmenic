import os from "os";
import driveList from "drivelist";
import * as pf from "platform-folders";

import { DeviceDrive } from "../../src.node.common/app-data/fileSystem.types.js";

import {
  FileSystemEntry,
  FileSystemRootFolder,
  DeviceSpecialFolder,
  SpecialFolderTypeKey,
} from "../../src.node.common/app-data/fileSystem.types.js";

import { DirEntry } from "../../src.node.common/fileSystem/types.js";
import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";
import { DeviceRootFolders } from "../../src.node.common.server/fileSystem/deviceRootFolders.js";

export class DeviceAppRootFolders extends DeviceRootFolders {
  constructor() {
    super();
  }
}

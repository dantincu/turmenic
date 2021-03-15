import os from "os";
import driveList from "drivelist";
import * as pf from "platform-folders";

import {
  getDirEntries,
  DirEntry,
} from "../../src.node.common/fileSystem/index.js";

import {
  DeviceRootFolders,
  DeviceSpecialFolder,
  SpecialFolderTypeKey,
} from "../../src.node.common/fileSystem/deviceRootFolders.js";

export class DeviceAppRootFolders extends DeviceRootFolders {
  constructor() {
    super();
  }
}

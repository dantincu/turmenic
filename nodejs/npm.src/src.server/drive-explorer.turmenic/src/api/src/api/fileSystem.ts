import { FileSystem } from "../fileSystem/fileSystem.js";
import { DeviceAppRootFolders } from "../fileSystem/deviceRootFolders";

export class AppFileSystem extends FileSystem {
  constructor(deviceRootFoldersComponent: DeviceAppRootFolders) {
    super(deviceRootFoldersComponent);
  }
}

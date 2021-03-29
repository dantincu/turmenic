import { DeviceAppRootFolders } from "./deviceRootFolders.js";
import { DeviceDrive } from "../../src.node.common/app-data/fileSystem.types.js";

import {
  FileSystemEntry,
  FileSystemRootFolder,
  FileSystemFile,
  FileSystemFolder,
} from "../../src.node.common/app-data/fileSystem.types.js";

export class FileSystem {
  private deviceRootFoldersComponent: DeviceAppRootFolders;
  private fileSystemDefaultLocation: FileSystemFolder;
  private fileSystemRootFolders?: FileSystemRootFolder[];

  constructor(deviceRootFoldersComponent: DeviceAppRootFolders) {
    this.deviceRootFoldersComponent = deviceRootFoldersComponent;
    this.fileSystemDefaultLocation = this.refreshFileSystemDefaultLocation();
  }

  public getFileSystemDefaultLocation(): FileSystemFolder {
    return this.fileSystemDefaultLocation;
  }

  public refreshFileSystemDefaultLocation(): FileSystemFolder {
    const homeSpecialFolder = this.deviceRootFoldersComponent.getSpecialFolder(
      "home"
    );

    const rootLocation: FileSystemRootFolder = {
      deviceSpecialFolder: homeSpecialFolder,
      absolutePath: homeSpecialFolder.devicePath as string,
    };

    const defaultLocation: FileSystemFolder = {
      rootFolder: rootLocation,
      absolutePath: rootLocation.absolutePath,
      files: [],
    };

    this.fileSystemDefaultLocation = defaultLocation;

    return defaultLocation;
  }

  public async getFileSystemRootFolders(): Promise<FileSystemRootFolder[]> {
    if (!this.fileSystemRootFolders) {
      this.fileSystemRootFolders = await this.refreshFileSystemRootFolders();
    }

    return this.fileSystemRootFolders;
  }

  public async refreshFileSystemRootFolders(): Promise<FileSystemRootFolder[]> {
    const deviceSpecialFolders = this.getDeviceSpecialFolders();
    const deviceDriveMountPoints = await this.getDeviceDriveMountPoints();

    const fileSystemRootFolders = deviceSpecialFolders.concat(
      deviceDriveMountPoints
    );

    this.fileSystemRootFolders = fileSystemRootFolders;
    return fileSystemRootFolders;
  }

  public getDeviceSpecialFolders(): FileSystemRootFolder[] {
    const deviceSpecialFolders = this.deviceRootFoldersComponent
      .getSpecialFolders()
      .map((sf) => {
        const folder: FileSystemRootFolder = {
          deviceSpecialFolder: sf,
          absolutePath: sf.devicePath as string,
        };

        return folder;
      });

    return deviceSpecialFolders;
  }

  public async getDeviceDriveMountPoints(): Promise<FileSystemRootFolder[]> {
    const deviceDriveMountPoints = (
      await this.deviceRootFoldersComponent.getDeviceDriveMountPoints()
    ).map((mp: DeviceDrive) => {
      const folder: FileSystemRootFolder = {
        driveLetter: mp.driveLetter,
        label: mp.driveLabel,
        absolutePath: mp.drivePath,
      };

      return folder;
    });

    return deviceDriveMountPoints;
  }
}

import os from "os";
import driveList from "drivelist";
import * as pf from "platform-folders";

import { strReplaceAll } from "../../src.common/text/utils.js";
import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";

import { DirEntry } from "../../src.node.common/fileSystem/types.js";

import {
  DeviceDrive,
  DeviceSpecialFolder,
  SpecialFolderType,
  SpecialFolderTypeKey,
  specialFolderTypesList,
} from "../../src.node.common/app-data/fileSystem.types.js";

export const getPath = (name: SpecialFolderTypeKey): string | null => {
  let func: () => string;
  let retPath: string | null = null;

  switch (name) {
    case "home":
      func = pf.getHomeFolder;
      break;
    case "appData":
      func = pf.getDataHome; // There's also getDataFolders method which returns an array
      break;
    case "userData":
      func = pf.getConfigHome; // There's also getConfigFolders method which returns an array
      break;
    case "desktop":
      func = pf.getDesktopFolder;
      break;
    case "documents":
      func = pf.getDocumentsFolder;
      break;
    case "downloads":
      func = pf.getDownloadsFolder;
      break;
    case "music":
      func = pf.getMusicFolder;
      break;
    case "pictures":
      func = pf.getPicturesFolder;
      break;
    case "videos":
      func = pf.getVideosFolder;
      break;
    case "cache":
      func = pf.getCacheFolder;
      break;
    case "savegames":
      func = pf.getSaveGamesFolder;
      break;
  }

  if (func) {
    retPath = func();
  }

  return retPath;
};

export class DeviceRootFolders {
  private specialFoldersList: Readonly<DeviceSpecialFolder[]>;
  private specialFolderNames: SpecialFolderTypeKey[];

  constructor() {
    this.specialFolderNames = this.getDefaultSpecialFolderNames();
    this.specialFoldersList = Object.freeze(this.getSpecialFoldersList());
  }

  public getSpecialFolders(): Readonly<DeviceSpecialFolder[]> {
    return this.specialFoldersList;
  }

  public refreshSpecialFoldersList(): Readonly<DeviceSpecialFolder[]> {
    this.specialFoldersList = Object.freeze(this.getSpecialFoldersList());
    return this.specialFoldersList;
  }

  public getUserHomeDirPath(): string {
    const userHomeDirPath = os.homedir();
    return userHomeDirPath;
  }

  public setSpecialFolderNames(specialFolderNames: SpecialFolderTypeKey[]) {
    this.specialFolderNames = specialFolderNames;

    this.specialFoldersList = Object.freeze(this.getSpecialFoldersList());
    return this.specialFoldersList;
  }

  public resetSpecialFolderNames() {
    this.specialFolderNames = this.getDefaultSpecialFolderNames();

    this.specialFoldersList = Object.freeze(this.getSpecialFoldersList());
    return this.specialFoldersList;
  }

  getSpecialFoldersList(): DeviceSpecialFolder[] {
    const defaultSpecialFoldersList: DeviceSpecialFolder[] = this.specialFolderNames.map(
      (name) => {
        const specialFolder = this.getSpecialFolder(name);
        return specialFolder;
      }
    );

    return defaultSpecialFoldersList;
  }

  public getSpecialFolder(name: SpecialFolderTypeKey): DeviceSpecialFolder {
    const machineSpecialFolder = specialFolderTypesList[name];

    const specialFolder: DeviceSpecialFolder = {
      devicePath: getPath(name),
      folderType: {
        typeKey: name,
        typeName: machineSpecialFolder.typeName,
        typeDescription: machineSpecialFolder.typeDescription,
      },
    };

    return specialFolder;
  }

  public async getDeviceDriveMountPoints(): Promise<DeviceDrive[]> {
    const driveArr = await driveList.list();

    const mountPoints = driveArr
      .map((d) => {
        const deviceDrivesMx: DeviceDrive[] = d.mountpoints.map((mp) => {
          const deviceDrive: DeviceDrive = {
            drivePath: mp.path,
            driveLetter: this.getDriveLetter(mp.path),
            driveLabel: mp.label,
          };

          return deviceDrive;
        });

        return deviceDrivesMx;
      })
      .flat();

    return mountPoints;
  }

  getDriveLetter(drivePath: string): string {
    const driveLetter = strReplaceAll(drivePath, /[\/\\\:]*/g, "");
    return driveLetter as string;
  }

  getDefaultSpecialFolderNames(): SpecialFolderTypeKey[] {
    const specialFolderNames: SpecialFolderTypeKey[] = [
      "desktop",
      "downloads",
      "home",
      "documents",
      "pictures",
      "music",
      "videos",
    ];

    return specialFolderNames;
  }
}

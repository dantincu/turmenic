import os from "os";
import driveList from "drivelist";
import * as pf from "platform-folders";

import { strReplaceAll } from "../../src.common/text/utils.js";
import { getDirEntries, DirEntry } from "./index.js";

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

export type SpecialFolderTypeKey =
  | "home"
  | "appData"
  | "userData"
  | "desktop"
  | "documents"
  | "downloads"
  | "music"
  | "pictures"
  | "videos"
  | "cache"
  | "savegames";

export interface SpecialFolderType {
  typeKey: SpecialFolderTypeKey;
  typeName: string;
  typeDescription: string;
}

export const specialFolderTypesList = {
  home: {
    typeKey: "home",
    typeName: "Home folder",
    typeDescription:
      "Home folder (e.g. /home/<Username>, c:Users<Username>, /Users/<Username>)",
  } as SpecialFolderType,
  appData: {
    typeKey: "appData",
    typeName: "Per-User Application Directory",
    typeDescription:
      "Per-User Application Directory (e.g. /home/<Username>/.local/share, c:Users<Username>AppDataRoaming, /Users/<Username>/Library/Application Support)",
  } as SpecialFolderType,
  userData: {
    typeKey: "userData",
    typeName: "Directory for storing config files",
    typeDescription:
      "Directory for storing config files (e.g. /home/<Username>/.config, c:Users<Username>AppDataRoaming, /Users/<Username>/Library/Application Support)",
  } as SpecialFolderType,
  desktop: {
    typeKey: "desktop",
    typeName: "Desktop directory",
    typeDescription:
      "Desktop directory (e.g. /home/<Username>/Schreibtisch (on a German system), c:Users<Username>Desktop, /Users/<Username>/Desktop)",
  } as SpecialFolderType,
  documents: {
    typeKey: "documents",
    typeName: "Documents directory",
    typeDescription:
      "Documents directory (e.g. /home/<Username>/Dokumente (on a German system), c:Users<Username>Documents, /Users/<Username>/Documents)",
  } as SpecialFolderType,
  downloads: {
    typeKey: "downloads",
    typeName: "Downloads directory",
    typeDescription:
      "Downloads directory (e.g. /home/<Username>/Downloads, c:Users<Username>Downloads, /Users/<Username>/Downloads)",
  } as SpecialFolderType,
  music: {
    typeKey: "music",
    typeName: "Music directory",
    typeDescription:
      "Music directory (e.g. /home/<Username>/Musik (on a German system), c:Users<Username>Music, /Users/<Username>/Music)",
  } as SpecialFolderType,
  pictures: {
    typeKey: "pictures",
    typeName: "Pictures directory",
    typeDescription:
      "Pictures directory (e.g. /home/<Username>/Bilder (on a German system), c:Users<Username>Pictures, /Users/<Username>/Pictures)",
  } as SpecialFolderType,
  videos: {
    typeKey: "videos",
    typeName: "Videos directory",
    typeDescription:
      "Videos directory (e.g. /home/<Username>/Videos, c:Users<Username>Videos, /Users/<Username>/Videos)",
  } as SpecialFolderType,
  cache: {
    typeKey: "cache",
    typeName: "Cache directory",
    typeDescription:
      "Cache directory (e.g. /home/<Username>/.cache, c:Users<Username>AppDataLocal, /Users/<Username>/Library/Caches)",
  } as SpecialFolderType,
  savegames: {
    typeKey: "savegames",
    typeName: "Directory for saved games",
    typeDescription:
      "Directory for saved games (e.g. /home/<Username>/.local/share, c:Users<Username>SavedGames, /Users/<Username>/Library/Application Support)",
  } as SpecialFolderType,
};

export interface DeviceSpecialFolder {
  folderType?: SpecialFolderType;
  devicePath?: string | null;
}

export interface DeviceDrive {
  drivePath: string;
  driveLetter?: string;
  driveLabel?: string | null;
}

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

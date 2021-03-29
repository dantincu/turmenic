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

export interface DirEntryAttrs {
  archive: boolean;
  hidden: boolean;
  readonly: boolean;
  system: boolean;
}

export interface DirEntry {
  name: string;
  attrs?: DirEntryAttrs;
}

export interface DeviceSpecialFolder {
  folderType?: SpecialFolderType;
  devicePath?: string | null;
}

export interface DeviceDrive {
  drivePath: string;
  driveLetter?: string;
  driveLabel?: string | null;
}

export interface FileSystemRootFolder {
  absolutePath: string;
  driveLetter?: string;
  label?: string | null;
  deviceSpecialFolder?: DeviceSpecialFolder;
}

export interface FileSystemEntry {
  absolutePath: string;
  rootFolderRelPath?: string;
  rootFolder?: FileSystemRootFolder;
  attrs?: DirEntryAttrs;
}

export interface FileSystemFile extends FileSystemEntry {
  nameWithoutExtension: string;
  extension?: string;
}

export interface FileSystemFolder extends FileSystemEntry {
  files: FileSystemFile[];
  subFolders?: FileSystemFolder[];
}

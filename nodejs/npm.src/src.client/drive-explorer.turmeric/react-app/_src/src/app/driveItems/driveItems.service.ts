import { PayloadAction } from "@reduxjs/toolkit";

import {
  DriveFolder,
  DriveItem,
  DriveFile,
  DeviceAppDrives,
  AppSessionDrives,
  AppDrive,
} from "./driveItems.types";

export class DriveItemsService {
  public toggleFolder(state: DeviceAppDrives, payload: { folderId: number }) {}

  public renameFolder(
    state: DeviceAppDrives,
    payload: { folderId: number; newName: string }
  ) {}

  public moveFolder(
    state: DeviceAppDrives,
    payload: { folderId: number; destParentfolderId: number }
  ) {}

  public setSelectedFolder(
    state: DeviceAppDrives,
    payload: { rootFolderId: number; folderId?: number }
  ) {}

  public setCurrentFolder(
    state: DeviceAppDrives,
    payload: { rootFolderId: number; folderId?: number }
  ) {}

  public renameFile(
    state: DeviceAppDrives,
    payload: { fileId: number; folderId: number; newName: string }
  ) {}

  public moveFile(
    state: DeviceAppDrives,
    payload: {
      fileId: number;
      folderId: number;
      destParentfolderId: number;
    }
  ) {}

  public setSelectedFile(
    state: DeviceAppDrives,
    payload: {
      rootFolderId: number;
      folderId?: number;
      fileId?: number;
    }
  ) {}

  public setCurrentFile(
    state: DeviceAppDrives,
    payload: {
      rootFolderId: number;
      folderId?: number;
      fileId?: number;
    }
  ) {}

  getFolder(
    allFolders: DriveFolder[],
    folderId: number,
    errMsg = `Folder with id ${folderId} not found`
  ) {
    const folder = allFolders.find((fd) => fd.id === folderId);

    if (!folder) {
      throw new Error(errMsg);
    }

    return folder;
  }

  updateFolder(
    allFolders: DriveFolder[],
    folder: DriveFolder,
    errMsg = `Folder with id ${folder.id} not found`
  ) {
    const idx = allFolders.indexOf(folder);

    if (idx < 0) {
      throw new Error(errMsg);
    }

    allFolders.splice(idx, 1, folder);
  }

  getFile(
    allFolders: DriveFolder[],
    folderId: number,
    fileId: number,
    errMsg = `File with id ${fileId} not found`
  ) {
    const folder = this.getFolder(allFolders, folderId);
    const file = folder.files?.find((fl) => fl.id === fileId);

    if (!file) {
      throw new Error(errMsg);
    }

    return file;
  }

  updateFile(
    folder: DriveFolder,
    file: DriveFile,
    errMsg = `File with id ${file.id} not found`
  ) {
    const idx = folder.files?.indexOf(file) ?? -1;

    if (idx < 0) {
      throw new Error(errMsg);
    }

    folder.files?.splice(idx, 1, file);
  }

  getAppDrive(
    appSessionDrives: AppSessionDrives,
    rootFolderId: number,
    errMsg = `App drive with root folder id ${rootFolderId} not found`
  ) {
    const appDrive: AppDrive | null =
      appSessionDrives.appDrives.find(
        (drive) => drive.rootFolder.id === rootFolderId
      ) ?? null;

    if (!appDrive) {
      throw new Error(errMsg);
    }

    return appDrive;
  }
}

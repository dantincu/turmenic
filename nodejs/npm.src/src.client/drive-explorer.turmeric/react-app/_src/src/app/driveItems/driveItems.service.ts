import { PayloadAction } from "@reduxjs/toolkit";
import { testData } from "./driveItems.test-data.base";

import {
  DriveFolder,
  DriveItem,
  DriveFile,
  DeviceAppDrives,
  AppSessionDrives,
  AppDrive,
} from "./driveItems.types";

import { findIndex } from "../../js.common/dist/src.common/utils/arrays";

export class DriveItemsService {
  public toggleFolder(state: DeviceAppDrives, payload: { folderId: number }) {
    const folder = this.getFolder(
      state.appSessionDrives.allFolders,
      payload.folderId
    );

    folder.expanded = folder.expanded ?? false;
    folder.expanded = !folder.expanded;
  }

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
    payload: { rootFolderId: number; folderId: number }
  ) {
    const folder = this.getFolder(
      state.appSessionDrives.allFolders,
      payload.folderId
    );

    if (
      state.appSessionDrives.selectedFolder &&
      state.appSessionDrives.selectedFolder.id !== folder.id
    ) {
      state.appSessionDrives.selectedFolder.isSelected = false;

      this.updateFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.selectedFolder
      );
    }

    folder.expanded = folder.expanded ?? false;
    folder.expanded = !folder.expanded;
    folder.isSelected = true;
    state.appSessionDrives.selectedFolder = folder;
  }

  public setCurrentFolder(
    state: DeviceAppDrives,
    payload: { rootFolderId: number; folderId: number }
  ) {
    const folder = this.getFolder(
      state.appSessionDrives.allFolders,
      payload.folderId
    );

    if (
      state.appSessionDrives.currentFolder &&
      state.appSessionDrives.currentFolder.id !== folder.id
    ) {
      state.appSessionDrives.currentFolder.isCurrent = false;

      this.updateFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.currentFolder
      );
    }

    if (
      state.appSessionDrives.selectedFolder &&
      state.appSessionDrives.selectedFolder.id !== folder.id
    ) {
      state.appSessionDrives.selectedFolder.isSelected = false;

      this.updateFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.selectedFolder
      );
    }

    folder.expanded = true;
    folder.isCurrent = true;
    folder.isSelected = true;
    state.appSessionDrives.currentFolder = folder;
    state.appSessionDrives.selectedFolder = folder;
  }

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
      folderId: number;
      fileId: number;
    }
  ) {
    const file = this.getFile(
      state.appSessionDrives.allFolders,
      payload.folderId,
      payload.fileId
    );

    if (
      state.appSessionDrives.selectedFile &&
      file.id !== state.appSessionDrives.selectedFile.id
    ) {
      state.appSessionDrives.selectedFile.isSelected = false;

      const folderOfSelectedFile = this.getFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.selectedFile.parentFolderId as number
      );

      this.updateFile(
        folderOfSelectedFile,
        state.appSessionDrives.selectedFile
      );
    }

    file.isSelected = true;
    state.appSessionDrives.selectedFile = file;
  }

  public setCurrentFile(
    state: DeviceAppDrives,
    payload: {
      rootFolderId: number;
      folderId: number;
      fileId: number;
    }
  ) {
    const file = this.getFile(
      state.appSessionDrives.allFolders,
      payload.folderId,
      payload.fileId
    );

    if (
      state.appSessionDrives.currentFile &&
      file.id !== state.appSessionDrives.currentFile.id
    ) {
      state.appSessionDrives.currentFile.isCurrent = false;

      const folderOfCurrentFile = this.getFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.currentFile.parentFolderId as number
      );

      this.updateFile(folderOfCurrentFile, state.appSessionDrives.currentFile);
    }

    if (
      state.appSessionDrives.selectedFile &&
      file.id !== state.appSessionDrives.selectedFile.id
    ) {
      state.appSessionDrives.selectedFile.isSelected = false;

      const folderOfSelectedFile = this.getFolder(
        state.appSessionDrives.allFolders,
        state.appSessionDrives.selectedFile.parentFolderId as number
      );

      this.updateFile(
        folderOfSelectedFile,
        state.appSessionDrives.selectedFile
      );
    }

    file.isSelected = true;
    file.isCurrent = true;
    state.appSessionDrives.selectedFile = file;
    state.appSessionDrives.currentFile = file;
  }

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
    let idx = findIndex(allFolders, (fd: DriveFolder) => fd.id === folder.id)
      .index;

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
    const idx = findIndex(folder.files, (fl: DriveFile) => fl.id === file.id)
      .index;

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

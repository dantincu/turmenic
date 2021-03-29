import {
  DriveFolder,
  DriveFile,
  DeviceAppDrives,
  AppSession,
  AppDrive,
} from "../../js.common/src.node.common/app-data/deviceAppDriveItems/types";

import { findIndex } from "../../js.common/dist/src.common/utils/arrays";

export class DriveItemsService {
  public toggleFolder(state: DeviceAppDrives, payload: { folderId: number }) {
    const asd = state.appSession;
    const folder = this.getFolder(asd.allFolders, payload.folderId);

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
    payload: { folderId: number }
  ) {
    const asd = state.appSession;
    const folder = this.getFolder(asd.allFolders, payload.folderId);

    this.clearPreviousSelectedFile(asd);
    this.clearPreviousSelectedFolder(asd, folder);

    folder.expanded = folder.expanded ?? false;
    folder.expanded = !folder.expanded;
    folder.isSelected = true;
    asd.selectedFolder = folder;
  }

  public setCurrentFolder(
    state: DeviceAppDrives,
    payload: { folderId: number }
  ) {
    const asd = state.appSession;
    const folder = this.getFolder(asd.allFolders, payload.folderId);

    this.clearPreviousCurrentFile(asd);
    this.clearPreviousSelectedFile(asd);
    this.clearPreviousCurrentFolder(asd, folder);
    this.clearPreviousSelectedFolder(asd, folder);

    folder.expanded = true;
    folder.isCurrent = true;
    folder.isSelected = true;
    state.appSession.currentFolder = folder;
    state.appSession.selectedFolder = folder;
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
      folderId: number;
      fileId: number;
    }
  ) {
    const asd = state.appSession;
    const file = this.getFile(asd.allFolders, payload.folderId, payload.fileId);
    const folder = this.getFolder(asd.allFolders, payload.folderId);

    this.clearPreviousSelectedFolder(asd, folder);
    this.clearPreviousSelectedFile(asd, file);

    file.isSelected = true;
    state.appSession.selectedFile = file;
  }

  public setCurrentFile(
    state: DeviceAppDrives,
    payload: {
      folderId: number;
      fileId: number;
    }
  ) {
    const asd = state.appSession;
    const file = this.getFile(asd.allFolders, payload.folderId, payload.fileId);
    const folder = this.getFolder(asd.allFolders, payload.folderId);

    this.clearPreviousCurrentFolder(asd, folder);
    this.clearPreviousSelectedFolder(asd, folder);
    this.clearPreviousCurrentFile(asd, file);
    this.clearPreviousSelectedFile(asd, file);

    file.isSelected = true;
    file.isCurrent = true;
    asd.selectedFile = file;
    asd.currentFile = file;
  }

  clearPreviousSelectedFolder(asd: AppSession, folder: DriveFolder) {
    if (asd.selectedFolder && asd.selectedFolder.id !== folder.id) {
      asd.selectedFolder.isSelected = false;

      this.updateFolder(asd.allFolders, asd.selectedFolder);
      asd.selectedFolder = null;
    }
  }

  clearPreviousCurrentFolder(asd: AppSession, folder: DriveFolder) {
    if (asd.currentFolder && asd.currentFolder.id !== folder.id) {
      asd.currentFolder.isCurrent = false;
      asd.currentFolder.isSelected = false;

      this.updateFolder(asd.allFolders, asd.currentFolder);
      asd.currentFolder = null;
    }
  }

  clearPreviousSelectedFile(asd: AppSession, file?: DriveFile) {
    if (asd.selectedFile && (!file || file.id !== asd.selectedFile.id)) {
      asd.selectedFile.isSelected = false;

      const folderOfSelectedFile = this.getFolder(
        asd.allFolders,
        asd.selectedFile.parentFolderId as number
      );

      this.updateFile(folderOfSelectedFile, asd.selectedFile);
      asd.selectedFile = null;
    }
  }

  clearPreviousCurrentFile(asd: AppSession, file?: DriveFile) {
    if (asd.currentFile && (!file || file.id !== asd.currentFile.id)) {
      asd.currentFile.isCurrent = false;
      asd.currentFile.isSelected = false;

      const folderOfCurrentFile = this.getFolder(
        asd.allFolders,
        asd.currentFile.parentFolderId as number
      );

      this.updateFile(folderOfCurrentFile, asd.currentFile);
      asd.currentFile = null;
    }
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
      .idx;

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
      .idx;

    if (idx < 0) {
      throw new Error(errMsg);
    }

    folder.files?.splice(idx, 1, file);
  }

  getAppDrive(
    appSessionDrives: AppSession,
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

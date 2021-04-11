import {
  DriveFolder,
  DriveFile,
  DeviceAppDriveSessions,
  AppSession,
  AppDrive,
  DriveItem,
  DriveNode,
  FileNode,
  FolderNode,
} from "../../src.node.common/app-data/device-app-drives/types";

import { findIndex } from "../../src.common/arrays/arrays";

export class DriveItemsService {
  public toggleFolder(
    state: DeviceAppDriveSessions,
    payload: { folderUuid: string }
  ) {
    const appSession = state.defaultAppSession as AppSession;
    const folder = this.getFolder(appSession.allFolders, payload.folderUuid);
    const appDrive = appSession.appDrives.find(
      (ad) => ad.rootFolder.uuid === folder.uuid
    );

    folder.expanded = folder.expanded ?? false;
    folder.expanded = !folder.expanded;
  }

  public renameFolder(
    state: DeviceAppDriveSessions,
    payload: { folderUuid: string; newName: string }
  ) {}

  public moveFolder(
    state: DeviceAppDriveSessions,
    payload: { folderUuid: string; destParentfolderUuid: string }
  ) {}

  public setSelectedFolder(
    state: DeviceAppDriveSessions,
    payload: { folderUuid: string }
  ) {
    const appSession = state.defaultAppSession as AppSession;
    const folder = this.getFolder(appSession.allFolders, payload.folderUuid);

    this.clearPreviousSelectedFile(appSession);
    this.clearPreviousSelectedFolder(appSession, folder);

    folder.expanded = folder.expanded ?? false;
    folder.expanded = !folder.expanded;
    folder.isSelected = true;

    appSession.selectedFolderNode = folder.node;
  }

  public setCurrentFolder(
    state: DeviceAppDriveSessions,
    payload: { folderUuid: string }
  ) {
    const appSession = state.defaultAppSession as AppSession;
    const folder = this.getFolder(appSession.allFolders, payload.folderUuid);

    this.clearPreviousCurrentFile(appSession);
    this.clearPreviousSelectedFile(appSession);
    this.clearPreviousCurrentFolder(appSession, folder);
    this.clearPreviousSelectedFolder(appSession, folder);

    folder.expanded = true;
    folder.isCurrent = true;
    folder.isSelected = true;

    appSession.currentFolderNode = folder.node;
    appSession.selectedFolderNode = folder.node;
  }

  public renameFile(
    state: DeviceAppDriveSessions,
    payload: { fileUuid: string; folderUuid: string; newName: string }
  ) {}

  public moveFile(
    state: DeviceAppDriveSessions,
    payload: {
      fileUuid: string;
      folderUuid: string;
      destParentfolderUuid: string;
    }
  ) {}

  public setSelectedFile(
    state: DeviceAppDriveSessions,
    payload: {
      folderUuid: string;
      fileUuid: string;
    }
  ) {
    const appSession = state.defaultAppSession as AppSession;
    const file = this.getFile(
      appSession.allFolders,
      payload.folderUuid,
      payload.fileUuid
    );
    const folder = this.getFolder(appSession.allFolders, payload.folderUuid);

    this.clearPreviousSelectedFolder(appSession, folder);
    this.clearPreviousSelectedFile(appSession, file);

    file.isSelected = true;

    const fileNode = {
      uuid: file.uuid,
      name: file.name,
      parentFolderUuid: file.parentFolderUuid,
    } as FileNode;

    appSession.selectedFileNode = fileNode;
  }

  public setCurrentFile(
    state: DeviceAppDriveSessions,
    payload: {
      folderUuid: string;
      fileUuid: string;
    }
  ) {
    const appSession = state.defaultAppSession as AppSession;
    const file = this.getFile(
      appSession.allFolders,
      payload.folderUuid,
      payload.fileUuid
    );
    const folder = this.getFolder(appSession.allFolders, payload.folderUuid);

    this.clearPreviousCurrentFolder(appSession, folder);
    this.clearPreviousSelectedFolder(appSession, folder);
    this.clearPreviousCurrentFile(appSession, file);
    this.clearPreviousSelectedFile(appSession, file);

    file.isSelected = true;
    file.isCurrent = true;

    const fileNode = {
      uuid: file.uuid,
      name: file.name,
      parentFolderUuid: file.parentFolderUuid,
    } as FileNode;

    appSession.selectedFileNode = fileNode;
    appSession.currentFileNode = fileNode;
  }

  clearPreviousSelectedFolder(appSession: AppSession, folder: DriveFolder) {
    if (
      appSession.selectedFolderNode &&
      appSession.selectedFolderNode.uuid !== folder.uuid
    ) {
      const selectedFolder = this.getFolder(
        appSession.allFolders,
        appSession.selectedFolderNode.uuid
      );

      selectedFolder.isSelected = false;

      // this.updateFolder(appSession.allFolders, appSession.selectedFolder);
      appSession.selectedFolderNode = null;
    }
  }

  clearPreviousCurrentFolder(appSession: AppSession, folder: DriveFolder) {
    if (
      appSession.currentFolderNode &&
      appSession.currentFolderNode.uuid !== folder.uuid
    ) {
      const selectedFolder = this.getFolder(
        appSession.allFolders,
        appSession.currentFolderNode.uuid
      );

      selectedFolder.isCurrent = false;
      selectedFolder.isSelected = false;

      // this.updateFolder(appSession.allFolders, appSession.currentFolder);
      appSession.currentFolderNode = null;
    }
  }

  clearPreviousSelectedFile(appSession: AppSession, file?: DriveFile) {
    if (
      appSession.selectedFileNode &&
      (!file || file.uuid !== appSession.selectedFileNode.uuid)
    ) {
      const selectedFile = this.getFile(
        appSession.allFolders,
        appSession.selectedFileNode.parentFolderUuid as string,
        appSession.selectedFileNode.uuid
      );

      selectedFile.isSelected = false;

      const folderOfSelectedFile = this.getFolder(
        appSession.allFolders,
        appSession.selectedFileNode.parentFolderUuid as string
      );

      // this.updateFile(folderOfSelectedFile, appSession.selectedFile);
      appSession.selectedFileNode = null;
    }
  }

  clearPreviousCurrentFile(appSession: AppSession, file?: DriveFile) {
    if (
      appSession.currentFileNode &&
      (!file || file.uuid !== appSession.currentFileNode.uuid)
    ) {
      const currentFile = this.getFile(
        appSession.allFolders,
        appSession.currentFileNode.parentFolderUuid as string,
        appSession.currentFileNode.uuid
      );

      currentFile.isCurrent = false;
      currentFile.isSelected = false;

      const folderOfCurrentFile = this.getFolder(
        appSession.allFolders,
        appSession.currentFileNode.parentFolderUuid as string
      );

      // this.updateFile(folderOfCurrentFile, appSession.currentFile);
      appSession.currentFileNode = null;
    }
  }

  getFolder(
    allFolders: DriveFolder[],
    folderUuid: string,
    errMsg = `Folder with id ${folderUuid} not found`
  ) {
    const folder = allFolders.find((fd) => fd.uuid === folderUuid);

    if (!folder) {
      throw new Error(errMsg);
    }

    return folder;
  }

  updateFolder(
    allFolders: DriveFolder[],
    folder: DriveFolder,
    errMsg = `Folder with id ${folder.uuid} not found`
  ) {
    let idx = findIndex(
      allFolders,
      (fd: DriveFolder) => fd.uuid === folder.uuid
    ).idx;

    if (idx < 0) {
      throw new Error(errMsg);
    }

    allFolders.splice(idx, 1, folder);
  }

  getFile(
    allFolders: DriveFolder[],
    folderUuid: string,
    fileUuid: string,
    errMsg = `File with id ${fileUuid} not found`
  ) {
    const folder = this.getFolder(allFolders, folderUuid);
    const file = folder.files?.find((fl) => fl.uuid === fileUuid);

    if (!file) {
      throw new Error(errMsg);
    }

    return file;
  }

  updateFile(
    folder: DriveFolder,
    file: DriveFile,
    errMsg = `File with id ${file.uuid} not found`
  ) {
    const idx = findIndex(
      folder.files ?? [],
      (fl: DriveFile) => fl.uuid === file.uuid
    ).idx;

    if (idx < 0) {
      throw new Error(errMsg);
    }

    folder.files?.splice(idx, 1, file);
  }

  getAppDrive(
    appSession: AppSession,
    rootFolderUuid: string,
    errMsg = `App drive with root folder id ${rootFolderUuid} not found`
  ) {
    const appDrive: AppDrive | null =
      appSession.appDrives.find(
        (drive) => drive.rootFolder.uuid === rootFolderUuid
      ) ?? null;

    if (!appDrive) {
      throw new Error(errMsg);
    }

    return appDrive;
  }
}

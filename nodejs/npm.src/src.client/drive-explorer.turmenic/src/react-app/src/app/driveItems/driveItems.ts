import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs-extra";
import { RootState } from "../store";
import { testData } from "./driveItems.test-data";
import {
  DriveFolder,
  DeviceAppDrives,
  AppSessionDrives,
  AppDrive,
} from "./driveItems.types";

const initialState: DeviceAppDrives = testData;

/*const initialState: DeviceAppDrives = {
  allAppDrives: [],
  appSessionDrives: {
    allFolders: [],
    appDrives: [],
  },
};*/

const getFolder = (
  allFolders: DriveFolder[],
  folderUuidB64: string,
  errMsg = `Folder with id ${folderUuidB64} not found`
) => {
  const folder = allFolders.find((fd) => fd.uuidB64 === folderUuidB64);

  if (!folder) {
    throw new Error(errMsg);
  }

  return folder;
};

const getFile = (
  allFolders: DriveFolder[],
  folderUuidB64: string,
  fileUuidB64: string,
  errMsg = `File with id ${fileUuidB64} not found`
) => {
  const folder = getFolder(allFolders, folderUuidB64);
  const file = folder.files.find((fl) => fl.uuidB64 === fileUuidB64);

  if (!file) {
    throw new Error(errMsg);
  }

  return file;
};

const getAppDrive = (
  appSessionDrives: AppSessionDrives,
  rootFolderUuidB64: string,
  errMsg = `App drive with root folder id ${rootFolderUuidB64} not found`
) => {
  const appDrive: AppDrive | null =
    appSessionDrives.appDrives.find(
      (drive) => drive.rootFolder.uuidB64 === rootFolderUuidB64
    ) ?? null;

  if (!appDrive) {
    throw new Error(errMsg);
  }

  return appDrive;
};

export const deviceAppDrivesSlice = createSlice({
  name: "deviceAppDrives",
  initialState,
  reducers: {
    toggleFolder: (state, action: PayloadAction<{ folderUuidB64: string }>) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUuidB64
      );
      const currentlyCollapsed = folder.collapsed ?? true;

      folder.collapsed = !currentlyCollapsed;
    },
    renameFolder: (
      state,
      action: PayloadAction<{ folderUuidB64: string; newName: string }>
    ) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUuidB64
      );
      folder.name = action.payload.newName;
    },
    moveFolder: (
      state,
      action: PayloadAction<{
        folderUuidB64: string;
        destParentfolderUuidB64: string;
      }>
    ) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUuidB64
      );

      const currentParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        folder.parentFolderUuidB64 as string
      );

      const destParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.destParentfolderUuidB64
      );

      folder.parentFolderUuidB64 = destParentFolder.uuidB64;

      currentParentFolder.subFolders = currentParentFolder.subFolders?.filter(
        (fd) => fd.uuidB64 !== folder.uuidB64
      );

      destParentFolder.subFolders?.push(folder);
    },
    setSelectedFolder: (
      state,
      action: PayloadAction<{
        rootFolderUuidB64: string;
        folderUuidB64?: string;
      }>
    ) => {
      const folder = action.payload.folderUuidB64
        ? getFolder(
            state.appSessionDrives.allFolders,
            action.payload.folderUuidB64
          )
        : null;

      const appDrive = getAppDrive(
        state.appSessionDrives,
        action.payload.rootFolderUuidB64
      );

      if (appDrive.selectedFolder) {
        appDrive.selectedFolder.isSelected = false;
      }

      if (folder) {
        folder.isSelected = true;
        appDrive.selectedFolder = folder;
      }
    },
    setCurrentFolder: (
      state,
      action: PayloadAction<{
        rootFolderUuidB64: string;
        folderUuidB64?: string;
      }>
    ) => {
      const folder = action.payload.folderUuidB64
        ? getFolder(
            state.appSessionDrives.allFolders,
            action.payload.folderUuidB64
          )
        : null;

      const appDrive = getAppDrive(
        state.appSessionDrives,
        action.payload.rootFolderUuidB64
      );

      if (appDrive.currentFolder) {
        appDrive.currentFolder.isCurrent = false;
      }

      if (folder) {
        folder.isCurrent = true;
        appDrive.currentFolder = folder;
      }
    },
    renameFile: (
      state,
      action: PayloadAction<{
        fileUuidB64: string;
        folderUuidB64: string;
        newName: string;
      }>
    ) => {
      const file = getFile(
        state.appSessionDrives.allFolders,
        action.payload.folderUuidB64,
        action.payload.fileUuidB64
      );

      file.name = action.payload.newName;
    },
    moveFile: (
      state,
      action: PayloadAction<{
        fileUuidB64: string;
        folderUuidB64: string;
        destParentfolderUuidB64: string;
      }>
    ) => {
      const file = getFile(
        state.appSessionDrives.allFolders,
        action.payload.folderUuidB64,
        action.payload.fileUuidB64
      );

      const currentParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        file.parentFolderUuidB64 as string
      );

      const destParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.destParentfolderUuidB64
      );

      file.parentFolderUuidB64 = destParentFolder.uuidB64;

      currentParentFolder.files = currentParentFolder.files?.filter(
        (fl) => fl.uuidB64 !== file.uuidB64
      );

      destParentFolder.files?.push(file);
    },
    setSelectedFile: (
      state,
      action: PayloadAction<{
        rootFolderUuidB64: string;
        folderUuidB64?: string;
        fileUuidB64?: string;
      }>
    ) => {
      const file =
        action.payload.fileUuidB64 && action.payload.folderUuidB64
          ? getFile(
              state.appSessionDrives.allFolders,
              action.payload.folderUuidB64,
              action.payload.fileUuidB64
            )
          : null;

      const appDrive = getAppDrive(
        state.appSessionDrives,
        action.payload.rootFolderUuidB64
      );

      if (appDrive.selectedFile) {
        appDrive.selectedFile.isSelected = false;
      }

      if (file) {
        file.isSelected = true;
        appDrive.selectedFile = file;
      }
    },
    setCurrentFile: (
      state,
      action: PayloadAction<{
        rootFolderUuidB64: string;
        folderUuidB64?: string;
        fileUuidB64?: string;
      }>
    ) => {
      const file =
        action.payload.fileUuidB64 && action.payload.folderUuidB64
          ? getFile(
              state.appSessionDrives.allFolders,
              action.payload.folderUuidB64,
              action.payload.fileUuidB64
            )
          : null;

      const appDrive = getAppDrive(
        state.appSessionDrives,
        action.payload.rootFolderUuidB64
      );

      if (appDrive.currentFile) {
        appDrive.currentFile.isCurrent = false;
      }

      if (file) {
        file.isCurrent = true;
        appDrive.currentFile = file;
      }
    },
  },
});

export const selectAppDrives = (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.appDrives;
  return value;
};

export const selectFolder = (folderUuidB64: string) => (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders.find(
    (fd) => fd.uuidB64 === folderUuidB64
  );

  return value;
};

export const selectFile = (folderUuidB64: string, fileUuidB64: string) => (
  state: RootState
) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders
    .find((fd) => fd.uuidB64 === folderUuidB64)
    ?.files.find((fl) => fl.uuidB64 === fileUuidB64);

  return value;
};

export const {
  toggleFolder,
  renameFolder,
  renameFile,
  moveFolder,
  moveFile,
  setCurrentFile,
  setCurrentFolder,
  setSelectedFile,
  setSelectedFolder,
} = deviceAppDrivesSlice.actions;

export const deviceAppDrivesReducer = deviceAppDrivesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { testData } from "./driveItems.test-data";
import { DriveFolder, DeviceAppDrives } from "./driveItems.types";

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
  folderUxIntId: number,
  errMsg = `Folder with id ${folderUxIntId} not found`
) => {
  const folder = allFolders.find((fd) => fd.uxIntId === folderUxIntId);

  if (!folder) {
    throw new Error(errMsg);
  }

  return folder;
};

const getFile = (
  allFolders: DriveFolder[],
  folderUxIntId: number,
  fileIntId: number,
  errMsg = `File with id ${fileIntId} not found`
) => {
  const folder = getFolder(allFolders, folderUxIntId);
  const file = folder.files.find((fl) => fl.uxIntId === fileIntId);

  if (!file) {
    throw new Error(errMsg);
  }

  return file;
};

export const deviceAppDrivesSlice = createSlice({
  name: "deviceAppDrives",
  initialState,
  reducers: {
    toggleFolder: (state, action: PayloadAction<{ folderUxIntId: number }>) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUxIntId
      );
      const currentlyCollapsed = folder.collapsed ?? true;

      folder.collapsed = !currentlyCollapsed;
    },
    renameFolder: (
      state,
      action: PayloadAction<{ folderUxIntId: number; newName: string }>
    ) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUxIntId
      );
      folder.name = action.payload.newName;
    },

    moveFolder: (
      state,
      action: PayloadAction<{
        folderUxIntId: number;
        destParentfolderUxIntId: number;
      }>
    ) => {
      const folder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.folderUxIntId
      );

      const currentParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        folder.parentFolderUxIntId as number
      );

      const destParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.destParentfolderUxIntId
      );

      folder.parentFolderUxIntId = destParentFolder.uxIntId;

      currentParentFolder.subFolders = currentParentFolder.subFolders?.filter(
        (fd) => fd.uxIntId !== folder.uxIntId
      );

      destParentFolder.subFolders?.push(folder);
    },

    renameFile: (
      state,
      action: PayloadAction<{
        fileIntId: number;
        folderUxIntId: number;
        newName: string;
      }>
    ) => {
      const file = getFile(
        state.appSessionDrives.allFolders,
        action.payload.folderUxIntId,
        action.payload.fileIntId
      );

      file.name = action.payload.newName;
    },

    moveFile: (
      state,
      action: PayloadAction<{
        fileIntId: number;
        folderUxIntId: number;
        destParentfolderUxIntId: number;
      }>
    ) => {
      const file = getFile(
        state.appSessionDrives.allFolders,
        action.payload.folderUxIntId,
        action.payload.fileIntId
      );

      const currentParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        file.parentFolderUxIntId as number
      );

      const destParentFolder = getFolder(
        state.appSessionDrives.allFolders,
        action.payload.destParentfolderUxIntId
      );

      file.parentFolderUxIntId = destParentFolder.uxIntId;

      currentParentFolder.files = currentParentFolder.files?.filter(
        (fl) => fl.uxIntId !== file.uxIntId
      );

      destParentFolder.files?.push(file);
    },
  },
});

export const selectAppDrives = (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.appDrives;
  return value;
};

export const selectFolder = (folderUxIntId: number) => (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders.find(
    (fd) => fd.uxIntId === folderUxIntId
  );

  return value;
};

export const selectFile = (folderUxIntId: number, fileUxIntId: number) => (
  state: RootState
) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders
    .find((fd) => fd.uxIntId === folderUxIntId)
    ?.files.find((fl) => fl.uxIntId === fileUxIntId);

  return value;
};

export const {
  toggleFolder,
  renameFolder,
  renameFile,
  moveFolder,
  moveFile,
} = deviceAppDrivesSlice.actions;

export const deviceAppDrivesReducer = deviceAppDrivesSlice.reducer;

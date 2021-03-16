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
} = deviceAppDrivesSlice.actions;

export const deviceAppDrivesReducer = deviceAppDrivesSlice.reducer;

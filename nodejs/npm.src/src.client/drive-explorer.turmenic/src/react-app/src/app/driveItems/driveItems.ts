import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { defaultIntIdGenerator } from "../../utils/intIdGenerator";
import { testData } from "./driveItems.test-data";
import {
  AppDriveData,
  DriveItem,
  DriveFile,
  DriveFolder,
  assureIsFolder,
  isFolder,
} from "./driveItems.types";

const initialState: AppDriveData = testData;

const getFolder = (
  allFolders: DriveFolder[],
  folderIntId: number,
  errMsg = `Folder with id ${folderIntId} not found`
) => {
  const folder = allFolders.find((fd) => fd.uxIntId === folderIntId);

  if (!folder) {
    throw new Error(errMsg);
  }

  return folder;
};

const getFile = (
  allFolders: DriveFolder[],
  folderIntId: number,
  fileIntId: number,
  errMsg = `File with id ${fileIntId} not found`
) => {
  const folder = getFolder(allFolders, folderIntId);
  const file = folder.files.find((fl) => fl.uxIntId === fileIntId);

  if (!file) {
    throw new Error(errMsg);
  }

  return file;
};

export const appDrivesSlice = createSlice({
  name: "appDrives",
  initialState,
  reducers: {
    renameFolder: (
      state,
      action: PayloadAction<{ folderIntId: number; newName: string }>
    ) => {
      const folder = getFolder(state.allFolders, action.payload.folderIntId);
      folder.name = action.payload.newName;
    },

    moveFolder: (
      state,
      action: PayloadAction<{
        folderIntId: number;
        destParentFolderIntId: number;
      }>
    ) => {
      const folder = getFolder(state.allFolders, action.payload.folderIntId);

      const destParentFolder = getFolder(
        state.allFolders,
        action.payload.destParentFolderIntId
      );

      folder.parentFolder = destParentFolder;
    },

    renameFile: (
      state,
      action: PayloadAction<{
        fileIntId: number;
        folderIntId: number;
        newName: string;
      }>
    ) => {
      const file = getFile(
        state.allFolders,
        action.payload.folderIntId,
        action.payload.fileIntId
      );

      file.name = action.payload.newName;
    },

    moveFile: (
      state,
      action: PayloadAction<{
        fileIntId: number;
        folderIntId: number;
        destParentFolderIntId: number;
      }>
    ) => {
      const file = getFile(
        state.allFolders,
        action.payload.folderIntId,
        action.payload.fileIntId
      );

      const destParentFolder = getFolder(
        state.allFolders,
        action.payload.destParentFolderIntId
      );

      file.parentFolder = destParentFolder;
    },
  },
});

export const selectRootFolders = (state: RootState) => {
  const value = state.appDrive.rootFolders;
  return value;
};

export const {
  renameFolder,
  renameFile,
  moveFolder,
  moveFile,
} = appDrivesSlice.actions;

export default appDrivesSlice.reducer;

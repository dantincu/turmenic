import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  DeviceAppDrives,
  AppDrive,
  DriveNode,
  DriveItem,
  DriveFile,
  AppSession,
  DriveFolder,
} from "../../js.common/src.node.common/app-data/deviceAppDriveItems/types";

import { testData } from "./deviceAppDriveItems.test-data";
import { DriveItemsService } from "./deviceAppDriveItems.service";

import {
  contains,
  updateMergeArr,
} from "../../js.common/dist/src.common/utils/arrays";
import { DeviceRootDirLocation } from "../../js.common/src.node.common/app-data/schema/device-dir-locations.schema";

const initialState: DeviceAppDrives = testData;
const driveItemsService = new DriveItemsService();

export const deviceAppDrivesSlice = createSlice({
  name: "deviceAppDrives",
  initialState,
  reducers: {
    updateAppDrives: (
      state,
      action: PayloadAction<{ deviceAppDrives: AppDrive[] }>
    ) => {
      updateMergeArr(
        state.allAppDrives,
        action.payload.deviceAppDrives,
        (srcVal: AppDrive, destVal: AppDrive) => srcVal.uuid === destVal.uuid
      );
    },
    toggleFolder: (state, action: PayloadAction<{ folderId: number }>) => {
      driveItemsService.toggleFolder(state, action.payload);
    },
    renameFolder: (
      state,
      action: PayloadAction<{ folderId: number; newName: string }>
    ) => {
      driveItemsService.renameFolder(state, action.payload);
    },
    moveFolder: (
      state,
      action: PayloadAction<{
        folderId: number;
        destParentfolderId: number;
      }>
    ) => {
      driveItemsService.moveFolder(state, action.payload);
    },
    setSelectedFolder: (
      state,
      action: PayloadAction<{
        folderId: number;
      }>
    ) => {
      driveItemsService.setSelectedFolder(state, action.payload);
    },
    setCurrentFolder: (
      state,
      action: PayloadAction<{
        folderId: number;
      }>
    ) => {
      driveItemsService.setCurrentFolder(state, action.payload);
    },
    renameFile: (
      state,
      action: PayloadAction<{
        fileId: number;
        folderId: number;
        newName: string;
      }>
    ) => {
      driveItemsService.renameFile(state, action.payload);
    },
    moveFile: (
      state,
      action: PayloadAction<{
        fileId: number;
        folderId: number;
        destParentfolderId: number;
      }>
    ) => {
      driveItemsService.moveFile(state, action.payload);
    },
    setSelectedFile: (
      state,
      action: PayloadAction<{
        folderId: number;
        fileId: number;
      }>
    ) => {
      driveItemsService.setSelectedFile(state, action.payload);
    },
    setCurrentFile: (
      state,
      action: PayloadAction<{
        folderId: number;
        fileId: number;
      }>
    ) => {
      driveItemsService.setCurrentFile(state, action.payload);
    },
  },
});

export const selectSessionAppDrives = (state: RootState) => {
  const value = state.deviceAppDrives.appSession.appDrives;
  return value;
};

export const selectAllAppDrives = (state: RootState) => {
  const value = state.deviceAppDrives.allAppDrives;
  return value;
};

export const selectFolder = (folderId: number) => (state: RootState) => {
  const value = state.deviceAppDrives.appSession.allFolders.find(
    (fd) => fd.id === folderId
  );

  return value;
};

export const selectSubFolders = (parentFolderId?: number | null) => (
  state: RootState
) => {
  const subFolderNodes = parentFolderId
    ? state.deviceAppDrives.appSession.allFolderNodes.find(
        (node) => node.itemId === parentFolderId
      )?.childNodes ?? []
    : [];

  const subFolderIds = subFolderNodes.map((node) => node.itemId);

  const subFolders = parentFolderId
    ? state.deviceAppDrives.appSession.allFolders.filter((folder) =>
        contains(subFolderIds, folder.id)
      )
    : [];

  return subFolders;
};

export const selectFile = (folderId: number, fileId: number) => (
  state: RootState
) => {
  const value = state.deviceAppDrives.appSession.allFolders
    .find((fd) => fd.id === folderId)
    ?.files?.find((fl) => fl.id === fileId);

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DeviceAppDrives } from "./driveItems.types";

import { testData } from "./driveItems.test-data";
import { DriveItemsService } from "./driveItems.service";

import { contains } from "../../js.common/dist/src.common/utils/arrays";

const initialState: DeviceAppDrives = testData;
const driveItemsService = new DriveItemsService();

export const deviceAppDrivesSlice = createSlice({
  name: "deviceAppDrives",
  initialState,
  reducers: {
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
        rootFolderId: number;
        folderId?: number;
      }>
    ) => {
      driveItemsService.setSelectedFolder(state, action.payload);
    },
    setCurrentFolder: (
      state,
      action: PayloadAction<{
        rootFolderId: number;
        folderId?: number;
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
        rootFolderId: number;
        folderId?: number;
        fileId?: number;
      }>
    ) => {
      driveItemsService.setSelectedFile(state, action.payload);
    },
    setCurrentFile: (
      state,
      action: PayloadAction<{
        rootFolderId: number;
        folderId?: number;
        fileId?: number;
      }>
    ) => {
      driveItemsService.setCurrentFile(state, action.payload);
    },
  },
});

export const selectAppDrives = (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.appDrives;
  return value;
};

export const selectFolder = (folderId: number) => (state: RootState) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders.find(
    (fd) => fd.id === folderId
  );

  return value;
};

export const selectSubFolders = (parentFolderId: number) => (
  state: RootState
) => {
  const subFolderNodes =
    state.deviceAppDrives.appSessionDrives.allFolderNodes.find(
      (node) => node.itemId === parentFolderId
    )?.subFolderNodes ?? [];

  const subFolderIds = subFolderNodes.map((node) => node.itemId);

  const subFolders = state.deviceAppDrives.appSessionDrives.allFolders.filter(
    (folder) => contains(subFolderIds, folder.id)
  );

  return subFolders;
};

export const selectFile = (folderId: number, fileId: number) => (
  state: RootState
) => {
  const value = state.deviceAppDrives.appSessionDrives.allFolders
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  DeviceAppDriveSessions,
  FileNode,
  FolderNode,
  AppDrive,
  DriveNode,
  DriveItem,
  DriveFile,
  AppSession,
  DriveFolder,
} from "../../src.node.common/app-data/device-app-drives/types";

import { testData } from "./deviceAppDriveItems.test-data";
import { DriveItemsService } from "./deviceAppDriveItems.service";

import { updateMergeArr } from "../../src.common/arrays/arr-diff";
import { contains } from "../../src.common/arrays/arrays";
import { DeviceRootDirLocation } from "../../src.node.common/app-data/schema/device-dir-locations.schema";

const initialState: DeviceAppDriveSessions = testData;
const driveItemsService = new DriveItemsService();

export const deviceAppDriveSessionsSlice = createSlice({
  name: "deviceAppDriveSessions",
  initialState,
  reducers: {
    updateAppSessions: (
      state,
      action: PayloadAction<{ allAppSessions: AppSession[] }>
    ) => {
      const allAppSessions = [...state.appSessions];

      updateMergeArr(
        allAppSessions,
        action.payload.allAppSessions,
        (srcVal: AppSession, destVal: AppSession) => {
          const retVal = srcVal.uuid === destVal.uuid;
          return retVal;
        }
      );

      state.appSessions = allAppSessions;
    },
    updateAppDrives: (
      state,
      action: PayloadAction<{ deviceAppDrives: AppDrive[] }>
    ) => {
      const allAppDrives = [...state.allAppDrives];

      updateMergeArr(
        allAppDrives,
        action.payload.deviceAppDrives,
        (srcVal: AppDrive, destVal: AppDrive) => {
          const retVal = srcVal.uuid === destVal.uuid;
          return retVal;
        }
      );

      state.allAppDrives = allAppDrives;
    },
    toggleFolder: (state, action: PayloadAction<{ folderUuid: string }>) => {
      driveItemsService.toggleFolder(state, action.payload);
    },
    renameFolder: (
      state,
      action: PayloadAction<{ folderUuid: string; newName: string }>
    ) => {
      driveItemsService.renameFolder(state, action.payload);
    },
    moveFolder: (
      state,
      action: PayloadAction<{
        folderUuid: string;
        destParentfolderUuid: string;
      }>
    ) => {
      driveItemsService.moveFolder(state, action.payload);
    },
    setSelectedFolder: (
      state,
      action: PayloadAction<{
        folderUuid: string;
      }>
    ) => {
      driveItemsService.setSelectedFolder(state, action.payload);
    },
    setCurrentFolder: (
      state,
      action: PayloadAction<{
        folderUuid: string;
      }>
    ) => {
      driveItemsService.setCurrentFolder(state, action.payload);
    },
    renameFile: (
      state,
      action: PayloadAction<{
        fileUuid: string;
        folderUuid: string;
        newName: string;
      }>
    ) => {
      driveItemsService.renameFile(state, action.payload);
    },
    moveFile: (
      state,
      action: PayloadAction<{
        fileUuid: string;
        folderUuid: string;
        destParentfolderUuid: string;
      }>
    ) => {
      driveItemsService.moveFile(state, action.payload);
    },
    setSelectedFile: (
      state,
      action: PayloadAction<{
        folderUuid: string;
        fileUuid: string;
      }>
    ) => {
      driveItemsService.setSelectedFile(state, action.payload);
    },
    setCurrentFile: (
      state,
      action: PayloadAction<{
        folderUuid: string;
        fileUuid: string;
      }>
    ) => {
      driveItemsService.setCurrentFile(state, action.payload);
    },
  },
});

export const selectAppSession = (sessionUuid: string) => (state: RootState) => {
  const value =
    sessionUuid === "default"
      ? state.deviceAppDriveSessions.defaultAppSession
      : state.deviceAppDriveSessions.appSessions.find(
          (session) => session.uuid === sessionUuid
        );

  return value;
};

export const selectAllAppDrives = (state: RootState) => {
  const value = state.deviceAppDriveSessions.allAppDrives;
  return value;
};

export const selectAllAppSessions = (state: RootState) => {
  const value = state.deviceAppDriveSessions.appSessions;
  return value;
};

export const selectFolder = (folderUuid: string) => (state: RootState) => {
  const value = state.deviceAppDriveSessions.defaultAppSession?.allFolders.find(
    (fd) => fd.uuid === folderUuid
  );

  return value;
};

export const selectSubFolders = (parentFolderUuid?: string | null) => (
  state: RootState
) => {
  const subFolderNodes = parentFolderUuid
    ? state.deviceAppDriveSessions.defaultAppSession?.allFolders.find(
        (fd) => fd.uuid === parentFolderUuid
      )?.node.subFolderNodes ?? []
    : [];

  const subFolderIds = subFolderNodes.map((node) => node.uuid);

  const subFolders = parentFolderUuid
    ? state.deviceAppDriveSessions.defaultAppSession?.allFolders.filter(
        (folder) => contains(subFolderIds, folder.uuid)
      )
    : [];

  return subFolders;
};

export const selectFile = (folderUuid: string, fileUuid: string) => (
  state: RootState
) => {
  const value = state.deviceAppDriveSessions.defaultAppSession?.allFolders
    .find((fd) => fd.uuid === folderUuid)
    ?.files?.find((fl) => fl.uuid === fileUuid);

  return value;
};

export const {
  updateAppSessions,
  updateAppDrives,
  toggleFolder,
  renameFolder,
  renameFile,
  moveFolder,
  moveFile,
  setCurrentFile,
  setCurrentFolder,
  setSelectedFile,
  setSelectedFolder,
} = deviceAppDriveSessionsSlice.actions;

export const deviceAppDriveSessionsReducer =
  deviceAppDriveSessionsSlice.reducer;

import path from "path";
import fs from "fs";
import getPath, * as pf from "platform-folders";

import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";

import {
  DirEntry,
  DirEntryWrapper,
} from "../../src.node.common/fileSystem/types.js";
import { DeviceRootFolders } from "../../src.node.common.server/fileSystem/deviceRootFolders.js";

import { appConsole } from "../../src.common/logging/appConsole.js";

const runTest = async () => {
  const deviceRootFolders = new DeviceRootFolders();

  appConsole.log("Running testFs");

  const homeDirPath = deviceRootFolders.getUserHomeDirPath();
  appConsole.log("homeDirPath", homeDirPath);

  const deviceDriveMountPoints = await deviceRootFolders.getDeviceDriveMountPoints();
  appConsole.log("deviceDriveMountPoints", deviceDriveMountPoints);

  deviceDriveMountPoints.forEach(async (m) => {
    // const dirEntries = await tryGetDirEntries(m.path);
    const dirEntries = await getDirEntries(m.drivePath);
    appConsole.log(`FOR ${m.drivePath} >>>> \n`);

    printEntries(dirEntries);
    appConsole.log("\n\n");
  });

  appConsole.log("getCacheFolder", pf.getCacheFolder());
  appConsole.log("getConfigFolders", pf.getConfigFolders());
  appConsole.log("getConfigHome", pf.getConfigHome());
  appConsole.log("getDataFolders", pf.getDataFolders());
  appConsole.log("getDataHome", pf.getDataHome());
  appConsole.log("getDesktopFolder", pf.getDesktopFolder());
  appConsole.log("getDocumentsFolder", pf.getDocumentsFolder());
  appConsole.log("getDownloadsFolder", pf.getDownloadsFolder());
  appConsole.log("getHomeFolder", pf.getHomeFolder());
  appConsole.log("getMusicFolder", pf.getMusicFolder());
  appConsole.log("getPicturesFolder", pf.getPicturesFolder());
  appConsole.log("getSaveGamesFolder", pf.getSaveGamesFolder());
  appConsole.log("getVideosFolder", pf.getVideosFolder());
};

const printEntries = (entries: string[]) => {
  for (let i = 0; i < entries.length; i++) {
    const str = JSON.stringify(entries[i]);
    appConsole.log(str);
  }
};

await runTest();

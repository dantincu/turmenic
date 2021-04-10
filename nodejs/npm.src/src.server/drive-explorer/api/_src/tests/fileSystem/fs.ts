import path from "path";
import fs from "fs";
import getPath, * as pf from "platform-folders";

import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";

import {
  DirEntry,
  DirEntryWrapper,
} from "../../src.node.common/fileSystem/types.js";
import { DeviceRootFolders } from "../../src.node.common.server/fileSystem/deviceRootFolders.js";

const runTest = async () => {
  const deviceRootFolders = new DeviceRootFolders();

  console.log("Running testFs");

  const homeDirPath = deviceRootFolders.getUserHomeDirPath();
  console.log("homeDirPath", homeDirPath);

  const deviceDriveMountPoints = await deviceRootFolders.getDeviceDriveMountPoints();
  console.log("deviceDriveMountPoints", deviceDriveMountPoints);

  deviceDriveMountPoints.forEach(async (m) => {
    // const dirEntries = await tryGetDirEntries(m.path);
    const dirEntries = await getDirEntries(m.drivePath);
    console.log(`FOR ${m.drivePath} >>>> \n`);

    printEntries(dirEntries);
    console.log("\n\n");
  });

  console.log("getCacheFolder", pf.getCacheFolder());
  console.log("getConfigFolders", pf.getConfigFolders());
  console.log("getConfigHome", pf.getConfigHome());
  console.log("getDataFolders", pf.getDataFolders());
  console.log("getDataHome", pf.getDataHome());
  console.log("getDesktopFolder", pf.getDesktopFolder());
  console.log("getDocumentsFolder", pf.getDocumentsFolder());
  console.log("getDownloadsFolder", pf.getDownloadsFolder());
  console.log("getHomeFolder", pf.getHomeFolder());
  console.log("getMusicFolder", pf.getMusicFolder());
  console.log("getPicturesFolder", pf.getPicturesFolder());
  console.log("getSaveGamesFolder", pf.getSaveGamesFolder());
  console.log("getVideosFolder", pf.getVideosFolder());
};

const printEntries = (entries: string[]) => {
  for (let i = 0; i < entries.length; i++) {
    const str = JSON.stringify(entries[i]);
    console.log(str);
  }
};

await runTest();

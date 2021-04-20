import path from "path";
import fs from "fs";
import util from "util";
import fsExtra from "fs-extra";

// @ts-ignore
import winattr from "winattr";

import {
  DirEntry,
  getEntryStatsAsync,
  writeFileAsync,
  readFileAsync,
  DirEntryAttrs,
  DirEntryWrapper,
  TryGetDirEntryOpts,
  TryGetDirEntryOptsNorm,
  copyAsync,
  emptyDirAsync,
  mkdirAsync,
  readdirAsync,
  removeDirAsync,
  removeFileAsync,
  renameAsync,
  rmAsync,
  rmdirAsync,
  winattrGetAsync,
  getFileExtension,
} from "./types.js";

export const getFileLastModifiedTime = async (filePath: string) => {
  let fileStats: fs.Stats | null = null;

  try {
    fileStats = await getEntryStatsAsync(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    } else {
    }
  }

  return fileStats?.mtime ?? new Date(0);
};

export const createDirIfNotExisting = async (dirPath: string) => {
  let retVal = 0;

  try {
    await mkdirAsync(dirPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      retVal = 1;
    } else if (err.code === "ENOENT") {
      retVal = -1;
    } else {
      throw err;
    }
  }

  return retVal;
};

export const removeDirIfExists = async (dirPath: string) => {
  let retVal = false;

  try {
    await removeDirAsync(dirPath);
    retVal = true;
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  return retVal;
};

export const removeFileIfExists = async (filePath: string) => {
  try {
    await removeFileAsync(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

export const readFileIfExists = async (filePath: string) => {
  let content: string | null = null;

  try {
    content = (await readFileAsync(filePath)).toString("utf8") ?? "";
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  return content;
};

export const readDirIfExists = async (dirPath: string) => {
  let dirEntries: string[] | null = null;

  try {
    dirEntries = await readdirAsync(dirPath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    } else {
    }
  }

  return dirEntries;
};

export const isDirEntry = async (dirPath: string) => {
  const dirStats = await getEntryStatsAsync(dirPath);
  const isDir = dirStats.isDirectory();

  return isDir;
};

export const removeDirWithContentAsync = async (dirPath: string) => {
  await emptyDirAsync(dirPath);
  await rmdirAsync(dirPath);
};

export const removeEntryAsync = async (entryPath: string) => {
  const isDir = await isDirEntry(entryPath);

  if (isDir) {
    await removeDirWithContentAsync(entryPath);
  } else {
    await removeFileAsync(entryPath);
  }
};

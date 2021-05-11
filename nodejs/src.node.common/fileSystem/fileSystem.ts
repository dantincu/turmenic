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
  tryCatchEnoent,
  tryCatchEnoentWithRetVal,
  tryCatchEnoentWithVal,
} from "./types.js";

export const getFileLastModifiedTime = async (filePath: string) => {
  let fileStats: fs.Stats | null = await tryCatchEnoentWithRetVal(
    async () => await getEntryStatsAsync(filePath),
    true
  );

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
  let retVal =
    (await tryCatchEnoentWithRetVal(async () => {
      await removeDirAsync(dirPath);
      return true;
    }, true)) ?? false;

  return retVal;
};

export const removeFileIfExists = async (filePath: string) => {
  let retVal =
    (await tryCatchEnoentWithRetVal(async () => {
      await removeFileAsync(filePath);
      return true;
    }, true)) ?? false;

  return retVal;
};

export const readFileIfExists = async (filePath: string) => {
  let content = await tryCatchEnoentWithRetVal(
    async () => (await readFileAsync(filePath)).toString("utf8"),
    true
  );

  return content;
};

export const readDirIfExists = async (dirPath: string) => {
  let dirEntries = await tryCatchEnoentWithRetVal(
    async () => await readdirAsync(dirPath),
    true
  );

  return dirEntries;
};

export const isDirEntry = async (dirPath: string) => {
  const dirStats = await getEntryStatsAsync(dirPath);
  const isDir = dirStats?.isDirectory();

  return isDir;
};

export const tryGetEntryStatsAsync = async (
  entryPath: string,
  opts?: FileSystemEntryReadOpts | null | undefined
) => {
  opts = opts ?? {};

  const stats = await tryCatchEnoentWithRetVal(
    async () => await getEntryStatsAsync(entryPath),
    opts.catchEnoent
  );

  return stats;
};

export interface FileSystemEntryReadOpts {
  catchEnoent?: boolean | null | undefined;
}

export const tryRemoveDirWithContentAsync = async (
  dirPath: string,
  opts: FileSystemEntryReadOpts
) => {
  const retVal = await tryCatchEnoentWithRetVal(async () => {
    removeDirWithContentAsync(dirPath);
    return true;
  }, opts.catchEnoent);

  return retVal;
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

export const assureEnoent = async (entryPath: string) => {
  let enoent = false;

  try {
    await getEntryStatsAsync(entryPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      enoent = true;
    } else {
      throw err;
    }
  }

  if (!enoent) {
    throw new Error(`Entry path ${entryPath} already exists`);
  }
};

import path from "path";
import fs from "fs";

import {
  DirEntry,
  getEntryStatsAsync,
  DirEntryWrapper,
  TryGetDirEntryOpts,
  readdirAsync,
  winattrGetAsync,
  GetDirEntryOpts,
  getTryGetDirEntryOptsNorm,
  getGetDirEntryNormOpts,
  getFileExtension,
} from "./types.js";

import { forEachAsync } from "../../src.common/arrays/arrays-async.js";

export const tryGetDirEntriesWrpp = async (
  dirPath: string
): Promise<DirEntryWrapper[]> => {
  dirPath = path.normalize(dirPath);

  let entryNames: string[] = [];
  const entries: DirEntryWrapper[] = [];

  try {
    entryNames = await getDirEntries(dirPath);
  } catch (err) {
    entries.push({
      dirEntry: {
        name: "",
      },
      error: err,
    });
  }

  await forEachAsync(entryNames, async (entrName) => {
    const entryPath = path.join(dirPath, entrName);

    const entryWrapper: DirEntryWrapper = {
      dirEntry: {
        name: entrName,
      },
    };

    try {
      const entry: DirEntry = {
        name: entrName,
        attrs: await winattrGetAsync(entryPath),
      };

      entryWrapper.dirEntry = entry;
    } catch (err) {
      entryWrapper.error = err;
    }

    entries.push(entryWrapper);
  });

  return entries;
};

export const tryGetDirEntries = async (
  dirPath: string,
  opts?: TryGetDirEntryOpts
): Promise<DirEntry[]> => {
  dirPath = path.normalize(dirPath);
  const normOpts = getTryGetDirEntryOptsNorm(dirPath, opts);

  const entries: DirEntry[] = [];
  let entryNames: string[] = [];

  try {
    entryNames = await getDirEntries(dirPath, normOpts.opts);
  } catch (err) {
    await normOpts.errorCallback(err, dirPath);
  }

  await forEachAsync(entryNames, async (entrName) => {
    const entryPath = path.join(dirPath, entrName);

    try {
      const entry: DirEntry = {
        name: entrName,
        attrs: await winattrGetAsync(entryPath),
      };

      entries.push(entry);
    } catch (err) {
      await normOpts.errorCallback(err, entryPath);
    }
  });

  return entries;
};

const dirEntryMatchesOpts = async (
  parentDirPath: string,
  entryName: string,
  opts: GetDirEntryOpts
): Promise<{ stats: fs.Stats | null; matches: boolean; fullPath: string }> => {
  const retVal: {
    stats: fs.Stats | null;
    matches: boolean;
    fullPath: string;
  } = {
    stats: null,
    matches: true,
    fullPath: path.join(parentDirPath, entryName),
  };

  if (opts.onlyFiles || opts.onlyDirs || opts.onlyFilesWithExt) {
    retVal.stats = await getEntryStatsAsync(retVal.fullPath);

    if (opts.onlyDirs) {
      retVal.matches = retVal.stats.isDirectory();
    } else if (opts.onlyFiles) {
      retVal.matches = retVal.stats.isFile();
    }

    if (retVal.stats.isFile()) {
      let fileExt: string | null = null;

      if (opts.onlyFilesWithExt) {
        fileExt = fileExt ?? getFileExtension(entryName);
        retVal.matches = opts.onlyFilesWithExt.indexOf(fileExt) >= 0;
      }

      if (opts.exceptFilesWithExt) {
        fileExt = fileExt ?? getFileExtension(entryName);
        retVal.matches = opts.exceptFilesWithExt.indexOf(fileExt) < 0;
      }

      if (opts.exceptFiles) {
        retVal.matches = opts.exceptFiles.indexOf(retVal.fullPath) < 0;
      }
    }
  }

  return retVal;
};

const getDirEntriesCore = async (
  dirPath: string,
  opts: GetDirEntryOpts
): Promise<string[]> => {
  const entries = await readdirAsync(dirPath);
  let retEntries: string[] = [];

  await forEachAsync(entries, async (val) => {
    const { stats, matches, fullPath } = await dirEntryMatchesOpts(
      dirPath,
      val,
      opts as GetDirEntryOpts
    );

    if (matches) {
      retEntries.push(opts?.retFullPaths ? fullPath : val);
    }

    if (opts?.recursive && stats?.isDirectory()) {
      retEntries.splice.apply(retEntries, [
        retEntries.length,
        0,
        ...(await getDirEntriesCore(fullPath, opts)),
      ]);
    }
  });

  return retEntries;
};

export const getDirEntries = async (
  dirPath: string,
  opts?: GetDirEntryOpts
): Promise<string[]> => {
  dirPath = path.normalize(dirPath);
  opts = getGetDirEntryNormOpts(dirPath, opts);

  const retEntries = await getDirEntriesCore(dirPath, opts);
  return retEntries;
};

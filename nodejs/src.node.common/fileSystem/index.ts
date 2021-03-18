import path from "path";
import fs from "fs";
import util from "util";
import fsExtra from "fs-extra";

// @ts-ignore
import winattr from "winattr";

export const readFileAsync = util.promisify(fs.readFile);
export const writeFileAsync = util.promisify(fs.writeFile);
export const getEntryStatsAsync = util.promisify(fs.stat);
export const mkdirAsync = util.promisify(fs.mkdir);
export const rmdirAsync = util.promisify(fs.rmdir);
export const readdirAsync = util.promisify(fs.readdir);
export const copyAsync = util.promisify(fsExtra.copy);
export const removeDirAsync = util.promisify(fsExtra.remove);
export const emptyDirAsync = util.promisify(fsExtra.emptyDir);
export const removeFileAsync = util.promisify(fs.unlink);

export const winattrGetAsync = util.promisify(winattr.get);

export interface DirEntryWrapper {
  dirEntry: DirEntry;
  error?: any;
}

export interface DirEntryAttrs {
  archive: boolean;
  hidden: boolean;
  readonly: boolean;
  system: boolean;
}

export interface DirEntry {
  name: string;
  attrs?: DirEntryAttrs;
}

export interface GetDirEntryOpts {
  rethrowError?: boolean;
  errorCallback?: (err: any, entryPath: string) => Promise<void>;
}

interface GetDirEntryOptsNorm {
  rethrowError: boolean;
  errorCallback: (err: any, entryPath: string) => Promise<void>;
}

const getGetDirEntryOptsNorm = (
  opts?: GetDirEntryOpts
): GetDirEntryOptsNorm => {
  const refOpts = opts ?? {};
  const normOpts: GetDirEntryOptsNorm = {
    errorCallback:
      refOpts.errorCallback ??
      (async (err, entryPath: string) => {
        if (refOpts.rethrowError ?? true) {
          throw err;
        } else {
          console.log(
            `While trying to read attrs for entry path ${entryPath} caught an error`,
            err
          );
        }
      }),
    rethrowError: refOpts.rethrowError ?? true,
  };

  return normOpts;
};

export const tryGetDirEntries = async (
  dirPath: string
): Promise<DirEntryWrapper[]> => {
  const entryNames = await readdirAsync(dirPath);
  const entries: DirEntryWrapper[] = [];

  for (let i = 0; i < entryNames.length; i++) {
    const entrName = entryNames[i];
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
  }

  return entries;
};

export const getDirEntries = async (
  dirPath: string,
  opts?: GetDirEntryOpts
): Promise<DirEntry[]> => {
  const normOpts = getGetDirEntryOptsNorm(opts);

  const entryNames = await readdirAsync(dirPath);
  const entries: DirEntry[] = [];

  for (let i = 0; i < entryNames.length; i++) {
    const entrName = entryNames[i];
    const entryPath = path.join(dirPath, entrName);

    try {
      const entry: DirEntry = {
        name: entrName,
        attrs: await winattrGetAsync(entryPath),
      };

      entries.push(entry);
    } catch (err) {
      normOpts.errorCallback(err, entryPath);
    }
  }

  return entries;
};

export const getFileLastModifiedTime = async (filePath: string) => {
  let fileStats: fs.Stats | null = null;

  try {
    fileStats = await getEntryStatsAsync(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  return fileStats?.mtime ?? new Date(0);
};

export const createDirIfNotExisting = async (dirPath: string) => {
  try {
    await mkdirAsync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") {
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

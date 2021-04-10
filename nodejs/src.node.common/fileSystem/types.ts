import fs from "fs";
import util from "util";
import fsExtra from "fs-extra";

// @ts-ignore
import winattr from "winattr";
import path from "path";

export const readFileAsync = util.promisify(fs.readFile);
export const writeFileAsync = util.promisify(fs.writeFile);
export const getEntryStatsAsync = util.promisify(fs.stat);
export const mkdirAsync = util.promisify(fs.mkdir);
export const rmdirAsync = util.promisify(fs.rmdir);
export const readdirAsync = util.promisify(fs.readdir);
export const copyAsync = fsExtra.copy;
export const removeDirAsync = util.promisify(fsExtra.remove);
export const emptyDirAsync = util.promisify(fsExtra.emptyDir);
export const removeFileAsync = util.promisify(fs.unlink);
export const rmAsync = util.promisify(fs.rm);
export const renameAsync = util.promisify(fs.rename);

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

export interface TryGetDirEntryOpts {
  opts?: GetDirEntryOpts;
  rethrowError?: boolean;
  errorCallback?: (err: any, entryPath: string) => Promise<void>;
  enoentErrorCallback?: (err: any, entryPath: string) => Promise<void>;
}

export interface TryGetDirEntryOptsNorm {
  opts: GetDirEntryOpts;
  rethrowError: boolean;
  errorCallback: (err: any, entryPath: string) => Promise<void>;
}

export interface GetDirEntryOpts {
  retFullPaths?: boolean | null | undefined;
  recursive?: boolean | null | undefined;
  onlyDirs?: boolean | null | undefined;
  onlyFiles?: boolean | null | undefined;
  onlyFilesWithExt?: string[] | null | undefined;
  exceptFilesWithExt?: string[] | null | undefined;
  exceptFiles?: string[] | null | undefined;
}

export const getTryGetDirEntryOptsNorm = (
  dirPath: string,
  opts?: TryGetDirEntryOpts
): TryGetDirEntryOptsNorm => {
  opts = opts ?? {};
  const normOpts: TryGetDirEntryOptsNorm = {
    errorCallback:
      opts.errorCallback ??
      (async (err, entryPath: string) => {
        if (opts?.rethrowError ?? true) {
          if (err.code !== "ENOENT") {
            throw err;
          } else if (opts?.enoentErrorCallback) {
            await opts.enoentErrorCallback(err, entryPath);
          } else {
            throw err;
          }
        } else {
          console.log(
            `While trying to read attrs for entry path ${entryPath} caught an error`,
            err
          );
        }
      }),
    rethrowError: opts.rethrowError ?? true,
    opts: getGetDirEntryNormOpts(dirPath, opts.opts),
  };

  return normOpts;
};

export const getGetDirEntryNormOpts = (
  dirPath: string,
  opts?: GetDirEntryOpts | null | undefined
): GetDirEntryOpts => {
  opts = opts ?? {};

  if (opts.exceptFiles) {
    opts.exceptFiles = opts.exceptFiles.map((fp) =>
      path.isAbsolute(fp)
        ? path.normalize(fp)
        : path.normalize(path.join(dirPath, fp))
    );
  }

  opts.recursive = opts.recursive ?? false;
  opts.retFullPaths = opts.recursive || (opts.retFullPaths ?? false);

  opts.onlyDirs = opts.onlyDirs ?? false;
  opts.onlyFiles = opts.onlyFiles ?? false;

  return opts;
};

export const getFileExtension = (filePath: string) => {
  let ext = path.extname(filePath);

  if (ext.startsWith(".")) {
    ext = ext.substring(1);
  }

  return ext;
};
